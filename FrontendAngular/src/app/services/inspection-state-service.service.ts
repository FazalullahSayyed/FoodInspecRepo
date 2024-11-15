import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';

// @Injectable({
//   providedIn: 'root'
// })
// export class InspectionStateService {
//   private readonly STORAGE_KEY = 'inspectionData';
//   private inspectionDataSubject = new BehaviorSubject<any>(this.getInitialData());

//   inspectionData$ = this.inspectionDataSubject.asObservable();

//   constructor() {
//     // Sync with localStorage on service initialization
//     this.inspectionDataSubject.next(this.getInitialData());
//   }

//   // Update data and sync to localStorage
//   updateInspectionData(data: any) {
//     const updatedData = { ...this.inspectionDataSubject.value, ...data };
//     this.inspectionDataSubject.next(updatedData);
//     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData)); // Save to localStorage
//     console.log("Data saved to localStorage:", updatedData);
//   }

  // inspection-state-service.service.ts

// updateInspectionData(data: any) {
//   const updatedData = { ...this.inspectionDataSubject.value };

//   Object.keys(data).forEach((key) => {
//     if (data[key] !== null && data[key] !== undefined) {
//       updatedData[key] = data[key];
//     }
//   });

//   this.inspectionDataSubject.next(updatedData);
//   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
// }


  // Get data directly from BehaviorSubject
  // getInspectionData() {
  //   return this.inspectionDataSubject.value;
  // }

  // // Retrieve initial data from localStorage or set to an empty object if no data exists
  // private getInitialData() {
  //   const storedData = localStorage.getItem(this.STORAGE_KEY);
  //   return storedData ? JSON.parse(storedData) : {};
  // }

  // // Optionally, clear data from BehaviorSubject and localStorage
  // clearInspectionData() {
  //   this.inspectionDataSubject.next({});
  //   localStorage.removeItem(this.STORAGE_KEY); // Remove from localStorage
  // }



  @Injectable({
    providedIn: 'root'
  })
  export class InspectionStateService {
    private readonly STORAGE_KEY_PREFIX = 'inspectionData_';
    private inspectionDataSubjects: { [key: number]: BehaviorSubject<any> } = {};
  
    constructor() {}
  
    private getStorageKey(schoolId: number): string {
      return `${this.STORAGE_KEY_PREFIX}${schoolId}`;
    }
  
    // Initialize BehaviorSubject for a given schoolId
    private initializeSubject(schoolId: number): void {
      if (!this.inspectionDataSubjects[schoolId]) {
        const storedData = localStorage.getItem(this.getStorageKey(schoolId));
        this.inspectionDataSubjects[schoolId] = new BehaviorSubject<any>(
          storedData ? JSON.parse(storedData) : {}
        );
      }
    }
  
    // Update data for a specific schoolId
    updateInspectionData(data: any, schoolId: number): void {
      this.initializeSubject(schoolId);
      const updatedData = { ...this.inspectionDataSubjects[schoolId].value, ...data };
      this.inspectionDataSubjects[schoolId].next(updatedData);
      localStorage.setItem(this.getStorageKey(schoolId), JSON.stringify(updatedData));
      console.log(`Data saved to localStorage for schoolId ${schoolId}:`, updatedData);
    }
  
    // Get data for a specific schoolId
    getInspectionData(schoolId: number): any {
      this.initializeSubject(schoolId);
      return this.inspectionDataSubjects[schoolId].value;
    }
  
    // Retrieve observable for a specific schoolId
    getInspectionData$ (schoolId: number): Observable<any> {
      this.initializeSubject(schoolId);
      return this.inspectionDataSubjects[schoolId].asObservable();
    }
  
    // Clear data for a specific schoolId
    clearInspectionData(schoolId: number): void {
      if (this.inspectionDataSubjects[schoolId]) {
        this.inspectionDataSubjects[schoolId].next({});
        localStorage.removeItem(this.getStorageKey(schoolId));
        console.log(`Inspection data cleared for schoolId ${schoolId}`);
      }
    }
  

  
  
  private schoolDetails: SchoolDetailsDTO | null = null;

  

  setSchoolDetails(school: SchoolDetailsDTO): void {
    this.schoolDetails = school;
  }

  getSchoolDetails(): SchoolDetailsDTO | null {
    return this.schoolDetails;
  }

  clearSchoolDetails(): void {
    this.schoolDetails = null;
  }

}
