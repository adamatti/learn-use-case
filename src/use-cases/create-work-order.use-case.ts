import z from 'zod';
import logger, { type Logger } from '../logger';
import type {
  CompanyRepository,
  UserRepository,
  WorkOrderRepository,
} from '../repositories/index';
import type { WorkOrder } from '../repositories/types';
import { CompanyNotFoundError, UserNotFoundError } from './errors';

type CreateWorkOrderUseCaseDependencies = {
  companyRepository: CompanyRepository;
  userRepository: UserRepository;
  workOrderRepository: WorkOrderRepository;
  logger: Logger;
};

export const CreateWorkOrderSchema = z.object({
  companyId: z.coerce.number(),
  number: z.coerce.number(),
  description: z.string(),
  createdBy: z.string(),
  assignedTo: z.string().optional(),
});

type CreateWorkOrderPayload = z.infer<typeof CreateWorkOrderSchema>;

export const CreateWorkOrderUseCase = ({
  userRepository,
  companyRepository,
  workOrderRepository,
}: CreateWorkOrderUseCaseDependencies) => {
  return async (workOrder: CreateWorkOrderPayload): Promise<WorkOrder> => {
    logger.debug('Creating work order', { workOrder });

    const [company, createdBy, assignedTo] = await Promise.all([
      companyRepository.findById(workOrder.companyId),
      userRepository.findById(workOrder.createdBy),
      workOrder.assignedTo
        ? userRepository.findById(workOrder.assignedTo)
        : undefined,
    ]);

    if (!company) {
      throw new CompanyNotFoundError();
    }

    if (!createdBy) {
      throw new UserNotFoundError('Created by user not found');
    }

    if (workOrder.assignedTo && !assignedTo) {
      throw new UserNotFoundError('Assigned to user not found');
    }

    return await workOrderRepository.insert({
      company,
      number: workOrder.number,
      description: workOrder.description,
      createdBy,
      assignedTo,
    });
  };
};
