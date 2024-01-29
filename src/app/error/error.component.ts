import { Component } from '@angular/core';
import { GlobalErrorHandler } from '../../global-error-handler.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  constructor(public globalErrorHandler: GlobalErrorHandler) {}
}
