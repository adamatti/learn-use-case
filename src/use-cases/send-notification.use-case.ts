import z from 'zod';
import type { Cache } from '../cache';
import type { Logger } from '../logger';
import type { WorkOrderRepository } from '../repositories';
import { WorkOrderNotFoundError } from './errors';

export type SendNotificationDependencies = {
  logger: Logger;
  workOrderRepository: Pick<WorkOrderRepository, 'findById'>;
  cache: Cache;
};

export const SendNotificationSchema = z.object({
  companyId: z.number(),
  number: z.number(),
});

type SendNotificationPayload = z.infer<typeof SendNotificationSchema>;

export const SendNotificationUseCase = ({
  logger,
  workOrderRepository,
  cache,
}: SendNotificationDependencies) => {
  return async (payload: SendNotificationPayload) => {
    const workOrder = await workOrderRepository.findById(payload);

    if (!workOrder) {
      throw new WorkOrderNotFoundError();
    }

    const usersToSendEmail = [workOrder.createdBy, workOrder.assignedTo].filter(
      Boolean
    );

    for await (const user of usersToSendEmail) {
      const cacheKey = `notification:${user?.email}:${workOrder.number}`;
      const hasValue = await cache.get(cacheKey);
      if (hasValue) {
        logger.debug('Email already sent to user', {
          user: user?.email,
          woNumber: workOrder.number,
        });
        continue;
      }

      logger.debug('Sending email to user', {
        user: user?.email,
        woNumber: workOrder.number,
      });

      await cache.set(cacheKey, true);
    }
  };
};
