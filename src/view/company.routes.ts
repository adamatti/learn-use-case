import { Router } from 'express';
import { CreateCompanySchema, createCompany } from '../use-cases';

const router = Router();

router.post('/companies', async (req, res) => {
  const company = CreateCompanySchema.parse(req.body);
  const createdCompany = await createCompany(company);
  res.status(201).json(createdCompany);
});

export default router;
