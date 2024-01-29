import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', {
        validators: this.passwordMatchValidator.bind(this),
      }),
    });
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { passwordMismatch: boolean } | null {
    const password = this.registrationForm.get('password')?.value;
    if (control.value !== password) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    // Submit data to the server or perform the desired action
    console.log(this.registrationForm.value);
  }
}
