import { DestroyRef, inject, Service, signal } from '@angular/core';

const MINUTE_MS = 60_000;

@Service()
export class ClockService {
  private readonly _now = signal(new Date());
  private timeoutId?: ReturnType<typeof setTimeout>;

  readonly now = this._now.asReadonly();

  constructor() {
    this.scheduleNextTick();
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timeoutId));
  }

  private scheduleNextTick(): void {
    const msToNextMinute = MINUTE_MS - (Date.now() % MINUTE_MS);
    this.timeoutId = setTimeout(() => {
      this._now.set(new Date());
      this.scheduleNextTick();
    }, msToNextMinute);
  }
}
