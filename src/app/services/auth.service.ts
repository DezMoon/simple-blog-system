import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Adjust URL if your server endpoints are different
const BASE_URL = 'http://localhost:3000/api/auth';

interface AuthResponse {
  message: string;
  token: string; // Optional token for login response
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${BASE_URL}/register`, { username, email, password }) // Specify AuthResponse type
      .pipe(
        map((response) => response.message), // Assuming server returns 'message' property
        catchError((error) => of(error.error.message))
      );
  }

  login(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${BASE_URL}/login`, { username, email, password })
      .pipe(
        map((response: AuthResponse) => {
          this.setToken(response.token);
          return response.message;
        }),
        catchError((error) => of(error.error.message))
      );
  }

  getUserProfile(): Observable<any> {
    // Use appropriate type for user data
    return this.http.get<any>(`${BASE_URL}/profile`); // Adjust endpoint if needed
  }

  // Inside AuthService.ts

  updateUserProfile(updatedUser: any): Observable<any> {
    // Replace 'any' with actual user data type
    return this.http.put<any>(`${BASE_URL}/profile`, updatedUser).pipe(
      map((response) => response.message), // Update based on your API response
      catchError((error) => of(error.error.message))
    );
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  private setToken(token: string): void {
    this.token = token;
  }

  logout(): void {
    this.token = null;
  }
}
