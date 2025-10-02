import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  companyRepository,
  userRepository,
  workOrderRepository,
} from '../repositories';
import type { Company, User } from '../repositories/types';
import sns from '../sns';
import { createWorkOrder } from './create-work-order.use-case';

vi.mock('../repositories', () => ({
  companyRepository: {
    findById: vi.fn(),
  },
  userRepository: {
    findById: vi.fn(),
  },
  workOrderRepository: {
    insert: vi.fn((o) => Promise.resolve(o)),
  },
}));

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
