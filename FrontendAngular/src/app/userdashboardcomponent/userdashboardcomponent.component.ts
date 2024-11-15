import { Component, OnInit } from '@angular/core';
import { MappingService } from '../services/mapping.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';
import { InspectionStateService } from '../services/inspection-state-service.service';
@Component({
  selector: 'app-userdashboardcomponent',
  templateUrl: './userdashboardcomponent.component.html',
  styleUrls: ['./userdashboardcomponent.component.scss']
})
export class UserdashboardcomponentComponent implements OnInit {
  schoolDetails: SchoolDetailsDTO[] = [];  // Array to hold school details
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private mappingService: MappingService,
    private authService: AuthService,
    private router: Router,
    private inspectionStateService: InspectionStateService
  ) {}

  ngOnInit(): void {
    this.fetchSchoolDetails();
  }

  fetchSchoolDetails(): void {
    this.isLoading = true;
    this.errorMessage = null; // Reset error message
    const inspectorId = this.authService.getInspectorId(); // Get the inspector ID from AuthService

    if (inspectorId !== null) {
      this.mappingService.getSchoolDetailsForInspector(inspectorId).subscribe(
        (data: SchoolDetailsDTO[]) => {
          this.schoolDetails = data; // Store the retrieved school details
          this.isLoading = false; // Hide loading indicator
        },
        (error) => {
          this.errorMessage = 'Failed to load assigned schools: ' + error.error;
          this.isLoading = false; // Hide loading indicator
        }
      );
    } else {
      this.errorMessage = 'Inspector ID is not available.';
      this.isLoading = false; // Hide loading indicator
    }
  }

  // Pass schoolId when starting inspection
  // startInspection(schoolId: string) {
  //   console.log(schoolId)
  //   localStorage.setItem('schoolId', schoolId);
  //   this.router.navigate(['/UnannouncedCertificationComponent'], { state: { schoolId } });
  // }
  // startInspection(school: SchoolDetailsDTO): void {
  //   console.log('Starting inspection for:', school);
  //   localStorage.setItem('schoolId', school.schoolId);
  //   this.router.navigate(['/UnannouncedCertificationComponent'], { state: { schoolId: school.schoolId } });
  // }
  // startInspection(school: SchoolDetailsDTO): void {
  //   console.log('Starting inspection for:', school);
  //   // Optionally store the school details in localStorage if needed elsewhere
  //   localStorage.setItem('schoolId', school.schoolId);
  //   localStorage.setItem('schoolDetails', JSON.stringify(school)); // Store full details

  //   // Navigate with state
  //   this.router.navigate(['/UnannouncedCertificationComponent'], { state: { school } });
  // }
  // In UserDashboardcomponentComponent's startInspection method
// startInspection(school: SchoolDetailsDTO): void {
//   console.log('Starting inspection for:', school);
//   localStorage.setItem('schoolId', String(school.schoolId)); // Ensure it's a number
//   localStorage.setItem('schoolDetails', JSON.stringify(school)); // Store full details

//   // Navigate with state
//   this.router.navigate(['/UnannouncedCertificationComponent'], { state: { school } });
// }
// startInspection(school: SchoolDetailsDTO): void {
//   console.log('Starting inspection for:', school);
//   // Store the schoolId as a string in localStorage (if needed elsewhere as string)
//   localStorage.setItem('schoolId', school.schoolId.toString());
//   localStorage.setItem('schoolDetails', JSON.stringify(school)); // Store full details
//   this.inspectionStateService.setSchoolDetails(school);
//   console.log('schoolId');
//   // Navigate with state, passing the school object
//   this.router.navigate(['/UnannouncedCertificationComponent'], { state: { school } });
// }

startInspection(school: SchoolDetailsDTO): void {
  console.log('Starting inspection for:', school);
  // Store the schoolId as a string in localStorage
  localStorage.setItem('schoolId', school.schoolId.toString());
  localStorage.setItem('schoolDetails', JSON.stringify(school)); // Store full details
  this.inspectionStateService.setSchoolDetails(school);
  
  // Clear previous inspection data for this school if necessary
  // this.inspectionStateService.clearInspectionData(school.schoolId);

  // Navigate with state, passing the school object
  this.router.navigate(['/UnannouncedCertificationComponent'], { state: { school } });
}
}
