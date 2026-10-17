import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaggingLineService } from '../../data-access/bagging-line.service';
import { Machine } from '../../models/machine.model';
import { Navigation } from './navigation';

const MACHINES: Machine[] = [
  { id: 'scale', type: 'scale', name: 'Scale', status: 'running' },
  { id: 'packer', type: 'packer', name: 'Packer', status: 'alarm' },
];

describe('Navigation', () => {
  it('should render a compact tile for every machine', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: BaggingLineService, useValue: { machines: signal(MACHINES) } }],
    });
    const fixture = TestBed.createComponent(Navigation);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    const tiles = Array.from(element.querySelectorAll('app-machine-tile'));
    expect(tiles.map((tile) => tile.querySelector('.name')?.textContent)).toEqual([
      'Scale',
      'Packer',
    ]);
    expect(tiles.every((tile) => tile.classList.contains('variant-compact'))).toBe(true);
  });
});
