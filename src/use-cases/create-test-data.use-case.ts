import logger from '../logger';
import {
  companyRepository,
  userRepository,
  workOrderRepository,
} from '../repositories';

export const createTestData = async () => {
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
