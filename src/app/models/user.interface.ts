import { Role } from './roles.type';

export interface User {
  name: string;
  role: Role;
}

export interface UserWithToken extends User {
  token: string;
}
