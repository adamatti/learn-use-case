import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Company, User } from '../repositories/types';
import type { CreateWorkOrderUseCaseDependencies } from './create-work-order.use-case';
import { CreateWorkOrderUseCase } from './create-work-order.use-case';

describe('create work order', () => {
  let dependencies: CreateWorkOrderUseCaseDependencies;

  beforeEach(() => {
    dependencies = {
      companyRepository: {
        findById: vi.fn(() =>
          Promise.resolve({
            id: 1,
          } as Company)
        ),
      },
      userRepository: {
        findById: vi.fn(() => Promise.resolve({} as User)),
      },
      workOrderRepository: {
        insert: vi.fn((o) => Promise.resolve(o)),
      },
      logger: {
        info: vi.fn(),
      },
      sns: {
        publish: vi.fn(),
      },
    };
  });

  it('happy path', async () => {
    const createWo = CreateWorkOrderUseCase(dependencies);

    const workOrder = await createWo({
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

    expect(dependencies.companyRepository.findById).toHaveBeenCalledWith(1);
    expect(dependencies.userRepository.findById).toHaveBeenCalledWith('1');
    expect(dependencies.workOrderRepository.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        number: 1,
        description: 'Work Order 1',
      })
    );
    expect(dependencies.sns.publish).toHaveBeenCalledWith(
      'work-order-created',
      {
        companyId: 1,
        number: 1,
      }
    );
  });
});
