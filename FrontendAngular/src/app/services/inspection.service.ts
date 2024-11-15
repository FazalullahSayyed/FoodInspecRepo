import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  private baseUrl = 'http://localhost:9090'; // Your backend URL


  constructor(private http: HttpClient,private authService: AuthService) {}
  private getAuthorizationHeader(): HttpHeaders {
    const token = this.authService.getToken(); // Fetch token from AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Fetch all inspections
  getAllInspections(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Create a new inspection
  createInspection(inspectionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, inspectionData);
  }

  // Update an existing inspection
  updateInspection(id: number, inspectionData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, inspectionData);
  }

  // Delete an inspection
  deleteInspection(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  // registerInspector(inspectorData: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/inspectors/registerInspector`, inspectorData);
  // }
  registerInspector(inspectorData: any): Observable<any> {
    const headers = this.getAuthorizationHeader(); // Get headers with token
    return this.http.post(`${this.baseUrl}/inspectors/registerInspector`, inspectorData, { headers });
  }
}
