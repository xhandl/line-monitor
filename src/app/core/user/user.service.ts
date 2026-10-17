import { Service, signal } from '@angular/core';
import { User } from './user.model';

// Mocked user until authentication is in place.
const MOCK_USER: User = {
  id: 'operator-1',
  name: 'Operator',
  role: 'operator',
};

@Service()
export class UserService {
  private readonly _user = signal<User | null>(MOCK_USER);

  readonly user = this._user.asReadonly();
}
