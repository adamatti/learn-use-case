import type { WorkOrder } from './types.js';

const table: WorkOrder[] = [];

export const insert = (wo: WorkOrder): Promise<WorkOrder> => {
  table.push(wo);
  return Promise.resolve(wo);
};

export const list = ({
  companyId,
}: {
  companyId: number;
}): Promise<WorkOrder[]> => {
  const workOrders = table.filter((wo) => wo.company.id === companyId);
  return Promise.resolve(workOrders);
};
