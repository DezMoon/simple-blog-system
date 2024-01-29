import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler {
  private errorMessage: string | null = null;

  constructor(private router: Router) {}

  handleError(error: Error): void {
    this.errorMessage = error.message;
    // Log error to server or other logging system (optional)
    this.router.navigate(['/error']);
  }
}
