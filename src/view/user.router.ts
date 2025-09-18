import { Router } from 'express';
import { companyRepository, userRepository } from '../repositories';
import { CreateUserSchema, CreateUserUseCase } from '../use-cases';

const router = Router();

router.post('/users', async (req, res) => {
  const user = CreateUserSchema.parse(req.body);
  const create = CreateUserUseCase({ userRepository, companyRepository });
  const createdUser = await create(user);
  res.status(201).json(createdUser);
});

export default router;
