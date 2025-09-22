import logger from '../logger.js';
import { workOrderRepository } from '../repositories/index.js';

type ListWorkOrdersPayload = {
  companyId: number;
};

export const listWorkOrders = async ({ companyId }: ListWorkOrdersPayload) => {
  logger.debug('Listing work orders', { companyId });
  return await workOrderRepository.list({ companyId });
};
