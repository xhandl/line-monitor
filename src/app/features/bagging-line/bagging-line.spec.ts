import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BaggingLine } from './bagging-line';
import { BaggingLineService } from './data-access/bagging-line.service';
import { Machine } from './models/machine.model';

const MACHINES: Machine[] = [{ id: 'scale', type: 'scale', name: 'Scale', status: 'running' }];

describe('BaggingLine', () => {
  const service = {
    machines: signal<Machine[]>([]),
    loading: signal(false),
    error: signal<string | null>(null),
    reload: vi.fn(),
  };

  function render(state: Partial<{ machines: Machine[]; loading: boolean; error: string }>) {
    service.machines.set(state.machines ?? []);
    service.loading.set(state.loading ?? false);
    service.error.set(state.error ?? null);

    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: BaggingLineService, useValue: service }],
    });
    const fixture = TestBed.createComponent(BaggingLine);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  afterEach(() => service.reload.mockReset());

  it('should show the spinner while loading', () => {
    const element = render({ loading: true });

    expect(element.querySelector('app-loading')).not.toBeNull();
    expect(element.querySelector('router-outlet')).toBeNull();
  });

  it('should show the error with a retry action instead of the page', () => {
    const element = render({ error: 'Machine data could not be loaded.' });

    expect(element.querySelector('[role="alert"]')?.textContent).toContain('could not be loaded');
    expect(element.querySelector('router-outlet')).toBeNull();

    element.querySelector('button')?.click();

    expect(service.reload).toHaveBeenCalledTimes(1);
  });

  it('should show the empty state when there are no machines', () => {
    const element = render({ machines: [] });

    expect(element.textContent).toContain('No machines are configured');
    expect(element.querySelector('router-outlet')).toBeNull();
  });

  it('should render the page when machines are loaded', () => {
    const element = render({ machines: MACHINES });

    expect(element.querySelector('router-outlet')).not.toBeNull();
  });
});
