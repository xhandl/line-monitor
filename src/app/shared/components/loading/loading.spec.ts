import { TestBed } from '@angular/core/testing';
import { Loading } from './loading';

describe('Loading', () => {
  function render(label?: string): HTMLElement {
    const fixture = TestBed.createComponent(Loading);
    if (label !== undefined) {
      fixture.componentRef.setInput('label', label);
    }
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('should be announced as a status', () => {
    expect(render().getAttribute('role')).toBe('status');
  });

  it('should render the default label', () => {
    expect(render().textContent).toContain('Loading…');
  });

  it('should render a custom label', () => {
    expect(render('Loading machines…').textContent).toContain('Loading machines…');
  });
});
