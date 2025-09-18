import type { Company } from './types.js';

const table: Company[] = [];

export const insert = (company: Company): Promise<Company> => {
  table.push(company);
  return Promise.resolve(company);
};

export const findById = (id: number): Promise<Company | undefined> => {
  const entity = table.find((company) => company.id === id);
  return Promise.resolve(entity);
};
