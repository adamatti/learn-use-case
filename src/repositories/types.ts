export type Company = {
  id: number;
  name: string;
};

export type User = {
  company: Company;
  email: string;
};

export type WorkOrder = {
  company: Company;
  number: number;
  description: string;
  createdBy: User;
  assignedTo?: User;
};
