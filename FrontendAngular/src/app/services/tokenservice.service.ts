// token.service.ts
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class TokenService {
  getToken(): string | null {
    return localStorage.getItem('token');  // Assuming token is stored in localStorage
  }

  // decodeToken(): any {
  //   const token = this.getToken();
  //   return token ? jwt_decode(token) : null;
  // }
  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    const base64Url = token.split('.')[1]; // Get payload from token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe base64 with regular base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); // Convert base64 to string

    try {
      return JSON.parse(jsonPayload); // Parse the JSON payload
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getInspectorId(): number | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.inspectorId : null;  // Assuming 'inspectorId' is a claim in the token
  }
}
