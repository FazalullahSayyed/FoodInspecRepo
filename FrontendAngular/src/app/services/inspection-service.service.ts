import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class InspectionServiceService {
  private apiUrl = 'http://localhost:9090/inspecs';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to set Authorization header
  private getAuthorizationHeader(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Method to submit inspection form data with an optional file
  // submitInspection(data: any, schoolId: number, file?: File): Observable<any> {
  //   const inspectorId = this.authService.getInspectorId();
  //   if (inspectorId === null) {
  //     throw new Error('Inspector ID not found');
  //   }

  //   const headers = this.getAuthorizationHeader();
  //   const url = `${this.apiUrl}/create`;
  //   const formData = new FormData();

  //   formData.append('inspec', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  //   formData.append('inspectorId', String(inspectorId));
  //   formData.append('schoolId', String(schoolId));
  //   if (file) formData.append('file', file, file.name);

  //   return this.http.post(url, formData, { headers });
  // }
// inspection-service.service.ts
submitInspection(data: any, schoolId: number, files?: File[]): Observable<any> {
  const inspectorId = this.authService.getInspectorId();
  if (inspectorId === null) {
    throw new Error('Inspector ID not found');
  }

  const headers = this.getAuthorizationHeader();
  const url = `${this.apiUrl}/create`;
  const formData = new FormData();

  formData.append('inspec', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  formData.append('inspectorId', String(inspectorId));
  formData.append('schoolId', String(schoolId));
  if (files) {
    files.forEach((file, index) => {
      formData.append(`files`, file, file.name);
    });
  }

  return this.http.post(url, formData, { headers });
}
getInspectionById(id: number): Observable<any> {
  const headers = this.getAuthorizationHeader();
  const url = `${this.apiUrl}/${id}`;
  return this.http.get(url, { headers });
}
  // Method to delete previous inspections by user and school
  deletePreviousInspections(schoolId: number): Observable<void> {
    const inspectorId = this.authService.getInspectorId();
    if (inspectorId === null) {
      throw new Error('Inspector ID not found');
    }

    const headers = this.getAuthorizationHeader();
    const url = `${this.apiUrl}/deleteByUserAndSchool?userId=${inspectorId}&schoolId=${schoolId}`;
    return this.http.delete<void>(url, { headers });
  }

  // Method to fetch previous inspection data
  getPreviousInspection(schoolId: number): Observable<any> {
    const inspectorId = this.authService.getInspectorId();
    if (inspectorId === null) {
      throw new Error('Inspector ID not found');
    }

    const headers = this.getAuthorizationHeader();
    const url = `${this.apiUrl}/${inspectorId}/${schoolId}`;
    return this.http.get(url, { headers });
  }

  // Method to fetch all inspections
  getAllInspecs(): Observable<any> {
    const headers = this.getAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/all`, { headers });
  }

  // Method to fetch all inspections by user and school
  getAllInspecsByUserAndSchool(schoolId: number): Observable<any> {
    const inspectorId = this.authService.getInspectorId();
    if (inspectorId === null) {
      throw new Error('Inspector ID not found');
    }

    const headers = this.getAuthorizationHeader();
    const url = `${this.apiUrl}/${inspectorId}/${schoolId}`;
    return this.http.get(url, { headers });
  }
  archivePreviousInspections(schoolId: number): Observable<void> {
    const inspectorId = this.authService.getInspectorId();
    if (inspectorId === null) {
      throw new Error('Inspector ID not found');
    }

    const headers = this.getAuthorizationHeader();
    const url = `${this.apiUrl}/archiveByUserAndSchool?userId=${inspectorId}&schoolId=${schoolId}`;
    return this.http.put<void>(url, null, { headers });
  }

  // Get all active inspections (not archived)
  getActiveInspections(): Observable<any> {
    const headers = this.getAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/active`, { headers });
  }

  // Get active inspections by user and school
  getActiveInspectionsByUserAndSchool(schoolId: number): Observable<any> {
    const inspectorId = this.authService.getInspectorId();
    if (inspectorId === null) {
      throw new Error('Inspector ID not found');
    }

    const headers = this.getAuthorizationHeader();
    const url = `${this.apiUrl}/active/byUserAndSchool?userId=${inspectorId}&schoolId=${schoolId}`;
    return this.http.get(url, { headers });
  }












  
}
