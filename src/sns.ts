import logger from './logger';

/**
 * Fake SNS
 */
const sns = {
  publish: (topic: string, message: any) => {
    logger.info('Publishing message', {
      topic,
      message: JSON.stringify(message),
    });
    return Promise.resolve();
  },
};

export default sns;
