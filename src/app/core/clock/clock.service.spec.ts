import { TestBed } from '@angular/core/testing';
import { ClockService } from './clock.service';

describe('ClockService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 17, 10, 0, 30));
  });

  afterEach(() => vi.useRealTimers());

  it('should update exactly when the minute changes', () => {
    const now = TestBed.inject(ClockService).now;
    expect(now().getMinutes()).toBe(0);

    vi.advanceTimersByTime(29_999);
    expect(now().getMinutes()).toBe(0);

    vi.advanceTimersByTime(1);
    expect(now().getMinutes()).toBe(1);

    vi.advanceTimersByTime(60_000);
    expect(now().getMinutes()).toBe(2);
  });

  it('should stop ticking when destroyed', () => {
    TestBed.inject(ClockService);
    expect(vi.getTimerCount()).toBe(1);

    TestBed.resetTestingModule();

    expect(vi.getTimerCount()).toBe(0);
  });
});
