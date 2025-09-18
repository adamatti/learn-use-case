import { Router } from 'express';
import { companyRepository } from '../repositories';
import { CreateCompanySchema, CreateCompanyUseCase } from '../use-cases';

const router = Router();

router.post('/companies', async (req, res) => {
  const company = CreateCompanySchema.parse(req.body);
  const create = CreateCompanyUseCase({ companyRepository });
  const createdCompany = await create(company);
  res.status(201).json(createdCompany);
});

export default router;
