import type { Logger } from '../logger.js';
import type { WorkOrderRepository } from '../repositories/index.js';

type ListWorkOrdersDependencies = {
  logger: Logger;
  workOrderRepository: WorkOrderRepository;
};

type ListWorkOrdersPayload = {
  companyId: number;
};

export const ListWorkOrdersUseCase = ({
  logger,
  workOrderRepository,
}: ListWorkOrdersDependencies) => {
  return ({ companyId }: ListWorkOrdersPayload) => {
    logger.debug('Listing work orders', { companyId });
    return workOrderRepository.list({ companyId });
  };
};
