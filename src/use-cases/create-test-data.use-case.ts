import type { Logger } from '../logger';
import type {
  CompanyRepository,
  UserRepository,
  WorkOrderRepository,
} from '../repositories';

type CreateTestDataUseCaseDependencies = {
  companyRepository: CompanyRepository;
  userRepository: UserRepository;
  workOrderRepository: WorkOrderRepository;
  logger: Logger;
};

export const CreateTestDataUseCase = ({
  companyRepository,
  userRepository,
  workOrderRepository,
  logger,
}: CreateTestDataUseCaseDependencies) => {
  return async () => {
    const company = await companyRepository.insert({
      id: 1,
      name: 'Company 1',
    });

    const user = await userRepository.insert({
      company,
      email: 'user1@example.com',
    });

    await workOrderRepository.insert({
      company,
      number: 1,
      description: 'Work Order 1',
      createdBy: user,
    });

    logger.info('Test data created');
  };
};
