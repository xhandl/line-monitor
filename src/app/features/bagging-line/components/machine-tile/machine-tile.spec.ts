import { TestBed } from '@angular/core/testing';
import { Machine } from '../../models/machine.model';
import { MachineTile, MachineTileVariant } from './machine-tile';

const MACHINE: Machine = { id: 'closer', type: 'bagCloser', name: 'Closer', status: 'warning' };

describe('MachineTile', () => {
  function render(variant?: MachineTileVariant): HTMLElement {
    const fixture = TestBed.createComponent(MachineTile);
    fixture.componentRef.setInput('machine', MACHINE);
    if (variant) {
      fixture.componentRef.setInput('variant', variant);
    }
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('should render name, status and the compact variant by default', () => {
    const element = render();
    expect(element.textContent).toContain('Closer');
    expect(element.classList).toContain('status-warning');
    expect(element.classList).toContain('variant-compact');
  });

  it('should expose a readable status after the name', () => {
    const element = render();
    const status = element.querySelector('[role="img"]');

    expect(status?.getAttribute('aria-label')).toBe('Status: Warning');
    expect(element.querySelector('.name')?.compareDocumentPosition(status!)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('should render the machine type icon only in the detailed variant', () => {
    expect(render('compact').querySelector('.type-icon')).toBeNull();

    const detailed = render('detailed');
    expect(detailed.classList).toContain('variant-detailed');
    expect(detailed.querySelector('.type-icon')?.textContent?.trim()).toBe('grid_on');
  });
});
