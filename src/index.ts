import logger from './logger.js';
import { createTestData } from './use-cases/create-test-data.use-case.js';
import { app } from './view/index.js';

const port = process.env.PORT ?? 3000;

createTestData().then(() => {
  app.listen(port, () => {
    logger.info('Server is running', { port });
  });
});
