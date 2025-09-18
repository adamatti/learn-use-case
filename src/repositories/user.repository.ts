import type { User } from './types.js';

const table: User[] = [];

export const insert = (user: User): Promise<User> => {
  table.push(user);
  return Promise.resolve(user);
};

export const findById = (email: string): Promise<User | undefined> => {
  const entity = table.find((user) => user.email === email);
  return Promise.resolve(entity);
};
