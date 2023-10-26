import { Role } from './roles.type';

export interface User {
  name: string;
  role: Role;
  sub: string;
}

export interface UserWithToken extends User {
  token: string;
}
