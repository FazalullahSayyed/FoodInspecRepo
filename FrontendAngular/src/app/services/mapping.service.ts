import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { TokenService } from './tokenservice.service';
import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';
export interface School {
  address: any;
  id: number;
  name: string;
  // Add other fields as necessary
}

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  private apiBaseUrl = 'http://localhost:9090/mappings';  // Base URL for API

  constructor(private http: HttpClient, private authService: AuthService) {}  // Inject AuthService
  getToken(): string | null {
    return localStorage.getItem('token');  // Assuming token is stored in localStorage
  }

  // Function to generate headers with authorization
  private getAuthorizationHeader(): HttpHeaders {
    const token = this.authService.getToken();  // Get the token from AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Get all schools
  getAllSchools(): Observable<any> {
    const headers = this.getAuthorizationHeader();
    return this.http.get(`${this.apiBaseUrl}/schools`, { headers });
  }

  // Get all inspectors
  getAllInspectors(): Observable<any> {
    const headers = this.getAuthorizationHeader();
    return this.http.get(`${this.apiBaseUrl}/inspectors`, { headers });
  }

  // Get all mappings
  getAllMappings(): Observable<any> {
    const headers = this.getAuthorizationHeader();
    return this.http.get(`${this.apiBaseUrl}/list`, { headers });
  }
  getSchoolDetailsForInspector(inspectorId: number): Observable<SchoolDetailsDTO[]> {
    const headers = this.getAuthorizationHeader(); // Include headers with token
    return this.http.get<SchoolDetailsDTO[]>(`${this.apiBaseUrl}/${inspectorId}/schools`, { headers });
  }
  // Create new mapping
  mapInspectorToSchool(mappingData: any): Observable<any> {
    const headers = this.getAuthorizationHeader();
    return this.http.post(`${this.apiBaseUrl}/map`, mappingData, { headers });
  }

  // Update existing mapping
  updateMapping(mappingId: number, mappingData: any): Observable<any> {
    const headers = this.getAuthorizationHeader();
    return this.http.put(`${this.apiBaseUrl}/${mappingId}`, mappingData, { headers });
  }

  // Remove mapping
  removeMapping(mappingId: number): Observable<any> {
    const headers = this.getAuthorizationHeader();
    return this.http.delete(`${this.apiBaseUrl}/delete/${mappingId}`, { headers });
  }

  // Get schools for a specific inspector
  getSchoolsForInspector(inspectorId: number): Observable<School[]> {
    const headers = this.getAuthorizationHeader();
    return this.http.get<School[]>(`${this.apiBaseUrl}/inspectors/${inspectorId}/schools`, { headers });
  }
  // getSchoolDetailsForSchool(schoolId: number): Observable<SchoolDetailsDTO[]> {
  //   const token = this.authService.getToken(); // Assuming AuthService stores the token
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.get<SchoolDetailsDTO[]>(`${this.apiBaseUrl}/getSchoolDetailsForSchool/${schoolId}`, { headers });
  // }
  
}
