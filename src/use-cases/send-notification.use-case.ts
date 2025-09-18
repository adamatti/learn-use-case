import z from 'zod';
import type { Logger } from '../logger';
import type { WorkOrderRepository } from '../repositories';
import { WorkOrderNotFoundError } from './errors';

export type SendNotificationDependencies = {
  logger: Logger;
  workOrderRepository: Pick<WorkOrderRepository, 'findById'>;
};

export const SendNotificationSchema = z.object({
  companyId: z.number(),
  number: z.number(),
});

type SendNotificationPayload = z.infer<typeof SendNotificationSchema>;

export const SendNotificationUseCase = ({
  logger,
  workOrderRepository,
}: SendNotificationDependencies) => {
  return async (payload: SendNotificationPayload) => {
    const workOrder = await workOrderRepository.findById(payload);

    if (!workOrder) {
      throw new WorkOrderNotFoundError();
    }

    const usersToSendEmail = [workOrder.createdBy, workOrder.assignedTo].filter(
      Boolean
    );

    for (const user of usersToSendEmail) {
      logger.debug('Sending email to user', {
        user: user?.email,
        woNumber: workOrder.number,
      });
    }
  };
};
