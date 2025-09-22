import z from 'zod';
import { companyRepository } from '../repositories';

export const CreateCompanySchema = z.object({
  id: z.number(),
  name: z.string(),
});

type CreateCompanyPayload = z.infer<typeof CreateCompanySchema>;

export const createCompany = async (company: CreateCompanyPayload) => {
  return await companyRepository.insert(company);
};
