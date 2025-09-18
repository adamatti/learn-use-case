import type { SQSEvent } from 'aws-lambda';
import cache from '../src/cache';
import logger from '../src/logger';
import { workOrderRepository } from '../src/repositories';
import {
  SendNotificationSchema,
  SendNotificationUseCase,
} from '../src/use-cases';

export const handler = async (event: SQSEvent) => {
  const sendNotification = SendNotificationUseCase({
    logger,
    workOrderRepository,
    cache,
  });

  const jsonPayload = event.Records[0].body;
  const payload = SendNotificationSchema.parse(jsonPayload);

  await sendNotification(payload);
};
