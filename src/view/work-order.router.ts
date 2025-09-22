import { Router } from 'express';
import z from 'zod';
import {
  CreateWorkOrderSchema,
  createWorkOrder,
  listWorkOrders,
} from '../use-cases';

const router = Router();

router.get('/work-orders', async (req, res) => {
  const companyId = z.number().parse(req.headers['company-id']);

  const workOrders = await listWorkOrders({ companyId });

  res.json(workOrders);
});

router.post('/work-orders', async (req, res) => {
  const workOrder = CreateWorkOrderSchema.parse({
    ...req.body,
    companyId: req.headers['company-id'],
    createdBy: req.headers.user,
  });

  const createdWorkOrder = await createWorkOrder(workOrder);

  res.status(201).json(createdWorkOrder);
});

export default router;
