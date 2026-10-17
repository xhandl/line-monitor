import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loading } from '@shared/components/loading/loading';
import { Navigation } from './components/navigation/navigation';
import { BaggingLineService } from './data-access/bagging-line.service';

@Component({
  imports: [Loading, Navigation, RouterOutlet],
  selector: 'app-bagging-line',
  styleUrl: './bagging-line.scss',
  templateUrl: './bagging-line.html',
})
export class BaggingLine {
  protected readonly baggingLineService = inject(BaggingLineService);
}
