import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaggingLineService } from '../../data-access/bagging-line.service';
import { Machine } from '../../models/machine.model';
import { Overview } from './overview';

const MACHINES: Machine[] = [
  { id: 'scale', type: 'scale', name: 'Scale', status: 'running' },
  { id: 'packer', type: 'packer', name: 'Packer', status: 'alarm' },
  { id: 'closer', type: 'bagCloser', name: 'Closer', status: 'warning' },
];

describe('Overview', () => {
  function render(): HTMLElement {
    TestBed.configureTestingModule({
      providers: [{ provide: BaggingLineService, useValue: { machines: signal(MACHINES) } }],
    });
    const fixture = TestBed.createComponent(Overview);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('should have a page heading', () => {
    expect(render().querySelector('h1')?.textContent).toBe('Bagging line overview');
  });

  it('should render detailed tiles in production order', () => {
    const tiles = Array.from(render().querySelectorAll('ol > li > app-machine-tile'));

    expect(tiles.map((tile) => tile.querySelector('.name')?.textContent)).toEqual([
      'Scale',
      'Packer',
      'Closer',
    ]);
    expect(tiles.every((tile) => tile.classList.contains('variant-detailed'))).toBe(true);
  });
});
