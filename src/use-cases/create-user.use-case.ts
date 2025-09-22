import z from 'zod';
import { companyRepository, userRepository } from '../repositories';
import { CompanyNotFoundError } from './errors';

export const CreateUserSchema = z.object({
  email: z.string(),
  companyId: z.number(),
});

type CreateUserPayload = z.infer<typeof CreateUserSchema>;

export const createUser = async (user: CreateUserPayload) => {
  const company = await companyRepository.findById(user.companyId);

  if (!company) {
    throw new CompanyNotFoundError();
  }

  return await userRepository.insert({
    email: user.email,
    company,
  });
};
