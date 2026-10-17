import { Component, inject } from '@angular/core';
import { BaggingLineService } from '../../data-access/bagging-line.service';
import { MachineTile } from '../machine-tile/machine-tile';

@Component({
  imports: [MachineTile],
  selector: 'app-navigation',
  styleUrl: './navigation.scss',
  templateUrl: './navigation.html',
})
export class Navigation {
  protected readonly machines = inject(BaggingLineService).machines;
}
