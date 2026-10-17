import { Service } from '@angular/core';

@Service()
export class LoggerService {
  error(message: string, ...details: unknown[]): void {
    console.error(message, ...details);
  }
}
