export type UserRole = 'operator';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
