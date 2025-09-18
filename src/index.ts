import logger from './logger.js';
import {
  companyRepository,
  userRepository,
  workOrderRepository,
} from './repositories/index.js';
import { CreateTestDataUseCase } from './use-cases/create-test-data.use-case.js';
import { app } from './view/index.js';

const port = process.env.PORT ?? 3000;

const createTestData = CreateTestDataUseCase({
  companyRepository,
  userRepository,
  workOrderRepository,
  logger,
});

createTestData().then(() => {
  app.listen(port, () => {
    logger.info('Server is running', { port });
  });
});
