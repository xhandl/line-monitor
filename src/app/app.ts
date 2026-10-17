import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeader } from '@layout/main-header/main-header';

@Component({
  imports: [RouterOutlet, MainHeader],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
