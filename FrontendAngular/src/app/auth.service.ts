import { Injectable } from '@angular/core'; 
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');  // Assuming token is stored in localStorage
  }

  // private isLoggedInStatus: boolean = false;
  // private userRole: string = '';  // Stores the user's role
//   private apiUrl = 'http://localhost:9090';

//   constructor(private http: HttpClient) {
//   }

// login(credentials: any): Observable<any> {
//   return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' }).pipe(
//     tap((response: string) => {
//       if (response && response.includes('Login successful')) {
//         this.setLoggedIn(true);
//         this.setUserRole(credentials.role); // Use the role from the login form
//       } else {
//         this.setLoggedIn(false);
//         this.setUserRole('');
//       }
//     })
//   );
// }


//   setLoggedIn(status: boolean): void {
//     this.isLoggedInStatus = status;
//     localStorage.setItem('isLoggedIn', JSON.stringify(status));
//   }

//   isLoggedIn(): boolean {
//     return this.isLoggedInStatus;
//   }

//   setUserRole(role: string): void {
//     this.userRole = role;
//     localStorage.setItem('userRole', role);
//   }

//   getUserRole(): string {
//     return this.userRole;
//   }

//   isAdmin(): boolean {
//     return this.getUserRole().toUpperCase() === 'ADMIN';
//   }
 


//   logout(): void {
//     this.setLoggedIn(false);
//     this.setUserRole('');
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('userRole');
//   }
//   private isLoggedInStatus: boolean = false;
//   private apiUrl = 'http://localhost:9090';

//   constructor(private http: HttpClient) {}
//   login(credentials: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
//       tap(response => {
//         if (response.token) {
//           localStorage.setItem('token', response.token);
//           const decodedToken = this.decodeToken(response.token);
//           localStorage.setItem('role', decodedToken.role);
//           this.isLoggedInStatus = true;
//         } else {
//           throw new Error('No token received');
//         }
//       }),
//       catchError(error => {
//         this.isLoggedInStatus = false;
//         localStorage.setItem('isLoggedIn', 'false');
//         return throwError(() => new Error('Failed to login'));
//       })
//     );
//   }
  
//   private decodeToken(token: string): any {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     return JSON.parse(window.atob(base64));
//   }
  
//   isAdmin(): boolean {
//     return localStorage.getItem('role') === 'ADMIN';
//   }
  
//   logout(): void {
//     this.isLoggedInStatus = false;
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('token');
//   }

//   isLoggedIn(): boolean {
//     return this.isLoggedInStatus;
//   }
  
// setUserRole(role: string): void {
//     this.userRole = role;
//     localStorage.setItem('userRole', role);
//   }

//   getUserRole(): string {
//     return this.userRole;
//   }



 
// }
private isLoggedInStatus: boolean = false;
  private apiUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' }).pipe(
      tap(response => {
        if (response) {
          this.processLoginSuccess(response);
        } else {
          throw new Error('No token received');
        }
      }),
      catchError(this.handleError)
    );
  }

  private processLoginSuccess(token: string): void {
    localStorage.setItem('token', token);
    const decodedToken = this.decodeToken(token);
    localStorage.setItem('role', decodedToken.role);
    this.setUserRole(decodedToken.role);
    this.setLoggedIn(true);
  }

  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Login error:', error);
    this.setLoggedIn(false); 
    return throwError(() => new Error('Failed to login due to server error'));
  }

  setLoggedIn(status: boolean): void {
    this.isLoggedInStatus = status;
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || 'DEFAULT_ROLE';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
  getInspectorId(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      return payload.inspectorId; // Adjust according to your JWT structure
    }
    return null; // Return null if no token is available
  }
  // getSchoolId(): number | null {
  //   const token = this.getToken();
  //   if (token) {
  //     const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  //     return payload.schoolId; // Adjust based on JWT structure
  //   }
  //   return null; // Return null if no token or schoolId is available
  // }
  
  logout(): void {
    this.isLoggedInStatus = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  
}