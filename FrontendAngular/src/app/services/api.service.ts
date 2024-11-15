import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getInspector() {
    return this.http.get<any>(this.baseURL + "/all");
  }
  deleteInspector(id: number) {
    return this.http.delete<any>(this.baseURL + "/delete/" + id);
  }
  
  postInspector(data: any) {
    return this.http.post<any>(this.baseURL + "/add", data);
  }
  putInspector(data: any, id: number) {
    return this.http.put<any>(this.baseURL + "/update/"+ id, data);
  }
  
  baseURL = "http://localhost:9090";

  constructor(private http: HttpClient) { }

 
}
