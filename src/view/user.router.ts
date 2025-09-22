import { Router } from 'express';
import { CreateUserSchema, createUser } from '../use-cases';

const router = Router();

router.post('/users', async (req, res) => {
  const user = CreateUserSchema.parse(req.body);
  const createdUser = await createUser(user);
  res.status(201).json(createdUser);
});

export default router;
