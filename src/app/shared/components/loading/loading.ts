import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading',
  styleUrl: './loading.scss',
  templateUrl: './loading.html',
  host: {
    role: 'status',
  },
})
export class Loading {
  readonly label = input('Loading…');
}
