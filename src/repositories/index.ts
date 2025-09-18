import type * as companyRepository from './company.repository';
import type * as userRepository from './user.repository';
import type * as workOrderRepository from './work-order.repository';

export * as companyRepository from './company.repository';
export * as userRepository from './user.repository';
export * as workOrderRepository from './work-order.repository';

export type CompanyRepository = typeof companyRepository;
export type WorkOrderRepository = typeof workOrderRepository;
export type UserRepository = typeof userRepository;
