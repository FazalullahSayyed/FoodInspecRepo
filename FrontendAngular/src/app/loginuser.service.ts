import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private loginApiUrl = 'http://localhost:9090/login'; 

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  loginUser(user: User): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(this.loginApiUrl, user).pipe(
      map((response) => {
        if (response.success) {
          // Store user session upon successful login
          this.authService.login({
            email: user.email,
            password: user.password
          });
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of({ success: false, message: 'Login failed due to server error' });
      })
    );
  }
}
