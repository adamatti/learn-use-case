import z from 'zod';
import type { CompanyRepository } from '../repositories';

type CreateCompanyUseCaseDependencies = {
  companyRepository: CompanyRepository;
};

export const CreateCompanySchema = z.object({
  id: z.number(),
  name: z.string(),
});

type CreateCompanyPayload = z.infer<typeof CreateCompanySchema>;

export const CreateCompanyUseCase = ({
  companyRepository,
}: CreateCompanyUseCaseDependencies) => {
  return async (company: CreateCompanyPayload) => {
    return await companyRepository.insert(company);
  };
};
