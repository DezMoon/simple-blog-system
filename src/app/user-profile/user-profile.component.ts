import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Inject AuthService

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any; // Use appropriate type based on your User model

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserProfile(); // Fetch user data on initialization
  }

  getUserProfile(): void {
    this.authService.getUserProfile().subscribe((user) => {
      this.user = user; // Update component user data
    });
  }

  updateProfile(): void {
    const updatedUser = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      // Include other updated fields
    };

    this.authService.updateUserProfile(updatedUser).subscribe(
      () => {
        // Show success message and update UI
        this.user = updatedUser; // Update local user data
      },
      (error) => {
        // Handle error message and display to user
      }
    );
  }
}
