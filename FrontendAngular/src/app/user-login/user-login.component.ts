import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.navigateToDashboard();
    }
  }

  userLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Prepare the login payload from the form values
      const loginPayload = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        role: 'USER' // Default role
      };

      this.authService.login(loginPayload).pipe(
        catchError((error) => {
          this.errorMessage = 'Login failed. Please check your credentials or try again later.';
          this.isLoading = false;
          return throwError(() => new Error('Login failed'));
        })
      ).subscribe({
        next: () => this.navigateToDashboard(),
        error: (err) => console.error('Login failed:', err)
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  navigateToDashboard() {
    this.isLoading = false;
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
