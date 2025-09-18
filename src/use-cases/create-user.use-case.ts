import z from 'zod';
import type { CompanyRepository, UserRepository } from '../repositories';
import { CompanyNotFoundError } from './errors';

type CreateUserUseCaseDependencies = {
  userRepository: UserRepository;
  companyRepository: CompanyRepository;
};

export const CreateUserSchema = z.object({
  email: z.string(),
  companyId: z.number(),
});

type CreateUserPayload = z.infer<typeof CreateUserSchema>;

export const CreateUserUseCase = ({
  userRepository,
  companyRepository,
}: CreateUserUseCaseDependencies) => {
  return async (user: CreateUserPayload) => {
    const company = await companyRepository.findById(user.companyId);

    if (!company) {
      throw new CompanyNotFoundError();
    }

    return await userRepository.insert({
      email: user.email,
      company,
    });
  };
};
