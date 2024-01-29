import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.authService
      .login(this.username, this.email, this.password)
      .subscribe(() => {
        this.router.navigate(['/']); // Adjust to your desired route after login
      });
  }
}
