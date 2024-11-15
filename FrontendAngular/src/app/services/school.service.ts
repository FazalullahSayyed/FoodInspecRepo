import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';  // Import AuthService to get the token
import { School } from './mapping.service';
// import { MappingDTO } from '../models/SchoolDetailsDTO';
import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private baseUrl = 'http://localhost:9090/inspector'; // Backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Function to get authorization headers
  private getAuthorizationHeader(): HttpHeaders {
    const token = this.authService.getToken(); // Fetch the token from AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
 
  createSchool(schoolData: any): Observable<any> {
    const headers = this.getAuthorizationHeader(); // Include headers
    return this.http.post(`${this.baseUrl}`, schoolData, { headers });
  }

  updateSchool(id: number, schoolData: any): Observable<any> {
    const headers = this.getAuthorizationHeader(); // Include headers
    return this.http.put(`${this.baseUrl}/${id}`, schoolData, { headers });
  }

  getSchoolById(id: number): Observable<any> {
    const headers = this.getAuthorizationHeader(); // Include headers
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  getAllSchools(): Observable<any> {
    const headers = this.getAuthorizationHeader(); // Include headers
    return this.http.get(`${this.baseUrl}`, { headers });
  }

  private apiUrl = 'http://localhost:9090/mappings';

  getAssignedSchools(inspectorId: number): Observable<any[]> {
    const headers = this.getAuthorizationHeader(); // Make sure this returns the correct headers including the token
    return this.http.get<School[]>(`${this.apiUrl}/${inspectorId}/schools`, { headers }); // Use path variable instead of query parameter
}

}
