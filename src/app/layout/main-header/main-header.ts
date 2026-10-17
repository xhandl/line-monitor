import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClockService } from '@core/clock/clock.service';
import { UserService } from '@core/user/user.service';

@Component({
  imports: [DatePipe, RouterLink, NgOptimizedImage],
  selector: 'app-main-header',
  styleUrl: './main-header.scss',
  templateUrl: './main-header.html',
})
export class MainHeader {
  protected readonly user = inject(UserService).user;
  protected readonly now = inject(ClockService).now;
}
