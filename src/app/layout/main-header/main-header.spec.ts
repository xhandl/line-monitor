import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { User } from '@core/user/user.model';
import { UserService } from '@core/user/user.service';
import { MainHeader } from './main-header';

const NOW = new Date(2026, 9, 16, 10, 5);

describe('MainHeader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => vi.useRealTimers());

  function render(user: User | null): HTMLElement {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: UserService, useValue: { user: signal(user) } }],
    });
    const fixture = TestBed.createComponent(MainHeader);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('should render the current date and time', () => {
    const time = render(null).querySelector('time');

    expect(time?.textContent).toContain('16.10.2026 10:05');
    expect(time?.getAttribute('datetime')).toBe(NOW.toISOString());
  });

  it('should render the logged-in user', () => {
    const element = render({ id: 'operator-1', name: 'Jane', role: 'operator' });

    expect(element.textContent).toContain('Logged in as');
    expect(element.textContent).toContain('Jane');
  });

  it('should render no user section without a user', () => {
    expect(render(null).textContent).not.toContain('Logged in as');
  });
});
