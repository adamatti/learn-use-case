import { Router } from 'express';
import z from 'zod';
import logger from '../logger';
import {
  companyRepository,
  userRepository,
  workOrderRepository,
} from '../repositories';
import sns from '../sns';
import {
  CreateWorkOrderSchema,
  CreateWorkOrderUseCase,
  ListWorkOrdersUseCase,
} from '../use-cases';

const router = Router();

router.get('/work-orders', async (req, res) => {
  const companyId = z.number().parse(req.headers['company-id']);

  const list = ListWorkOrdersUseCase({
    workOrderRepository,
    logger,
  });

  const workOrders = await list({ companyId });

  res.json(workOrders);
});

router.post('/work-orders', async (req, res) => {
  const workOrder = CreateWorkOrderSchema.parse({
    ...req.body,
    companyId: req.headers['company-id'],
    createdBy: req.headers.user,
  });

  const create = CreateWorkOrderUseCase({
    userRepository,
    companyRepository,
    workOrderRepository,
    logger,
    sns,
  });

  const createdWorkOrder = await create(workOrder);

  res.status(201).json(createdWorkOrder);
});

export default router;
