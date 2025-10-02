import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  companyRepository,
  userRepository,
  workOrderRepository,
} from '../repositories';
import type { Company, User } from '../repositories/types';
import type { WorkOrder } from '../repositories/types';
import sns from '../sns';
import { createWorkOrder } from './create-work-order.use-case';

vi.mock('../repositories');
vi.mock('../sns');
vi.mock('../logger');

describe('create work order', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(companyRepository.findById).mockResolvedValue({
      id: 1,
    } as Company);
    vi.mocked(userRepository.findById).mockResolvedValue({
      id: 1,
    } as unknown as User);
    vi.mocked(workOrderRepository.insert).mockImplementation(async (o) => o as unknown as WorkOrder);
  });

  it('happy path', async () => {
    const workOrder = await createWorkOrder({
      companyId: 1,
      number: 1,
      description: 'Work Order 1',
      createdBy: '1',
    });

    expect(workOrder).toEqual(
      expect.objectContaining({
        number: 1,
        description: 'Work Order 1',
      })
    );

    expect(companyRepository.findById).toHaveBeenCalledWith(1);
    expect(userRepository.findById).toHaveBeenCalledWith('1');
    expect(workOrderRepository.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        number: 1,
        description: 'Work Order 1',
      })
    );
    expect(sns.publish).toHaveBeenCalledWith('work-order-created', {
      companyId: 1,
      number: 1,
    });
  });
});
