import { Component, inject } from '@angular/core';
import { MachineTile } from '../../components/machine-tile/machine-tile';
import { BaggingLineService } from '../../data-access/bagging-line.service';

@Component({
  imports: [MachineTile],
  selector: 'app-overview',
  styleUrl: './overview.scss',
  templateUrl: './overview.html',
})
export class Overview {
  protected readonly machines = inject(BaggingLineService).machines;
}
