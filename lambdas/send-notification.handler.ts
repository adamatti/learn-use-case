import type { SQSEvent } from 'aws-lambda';
import { SendNotificationSchema, sendNotification } from '../src/use-cases';

export const handler = async (event: SQSEvent) => {
  const jsonPayload = event.Records[0].body;
  const payload = SendNotificationSchema.parse(jsonPayload);

  await sendNotification(payload);
};
