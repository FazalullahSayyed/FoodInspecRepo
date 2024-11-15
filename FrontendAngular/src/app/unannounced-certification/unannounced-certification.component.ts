// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { InspectionServiceService } from '../services/inspection-service.service';
// import { AuthService } from '../auth.service';
// import { MappingService } from '../services/mapping.service';
// import { InspectionStateService } from '../services/inspection-state-service.service';
// import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// @Component({
//   selector: 'app-unannounced-certification',
//   templateUrl: './unannounced-certification.component.html',
//   styleUrls: ['./unannounced-certification.component.scss']
// })
// export class UnannouncedCertificationComponent implements OnInit {
//   // schoolDetails: SchoolDetailsDTO | null = null;
//   // inspectorId: number | null = null;
//   // schoolId: number | null = null;
//   // inspections: any[] = [];
//   // errorMessage: string | null = null;
//   // inspectionData: any = {}; // Store inspection data

//   // constructor(
//   //   private router: Router,
//   //   private authService: AuthService,
//   //   private inspectionService: InspectionServiceService,
//   //   private inspectionStateService: InspectionStateService,
//   //   private mappingService: MappingService,
//   //   private cd: ChangeDetectorRef,
//   // ) {}

//   // ngOnInit(): void {
//   //   this.inspectorId = this.authService.getInspectorId();
//   //   this.schoolId = +localStorage.getItem('schoolId')!;  // Fetch schoolId from localStorage

//   //   if (this.inspectorId && this.schoolId) {
//   //     this.fetchSchoolDetails();  // Dynamically fetch school details based on schoolId
//   //     this.loadActiveInspections();
//   //   } else {
//   //     this.errorMessage = 'Inspector ID or School ID is missing.';
//   //   }
//   // }

//   // fetchSchoolDetails(): void {
//   //   this.mappingService.getSchoolDetailsForInspector(this.inspectorId!).subscribe(
//   //     (data: SchoolDetailsDTO[]) => {
//   //       if (data && data.length > 0) {
//   //         this.schoolDetails = data[0];  // Assuming the first school is the one we want
//   //       } else {
//   //         this.errorMessage = 'No school details found for this inspector.';
//   //       }
//   //     },
//   //     (error) => {
//   //       this.errorMessage = 'Failed to load school details: ' + error.error;
//   //     }
//   //   );
//   // }
  

//   // loadActiveInspections(): void {
//   //   if (this.schoolId) {
//   //     // Use getAllInspecsByUserAndSchool to fetch all inspections for this school
//   //     this.inspectionService.getAllInspecsByUserAndSchool(this.schoolId).subscribe({
//   //       next: (data) => {
//   //         if (data && data.length > 0) {
//   //           this.inspections = data;  // Store both active and archived inspections
//   //         } else {
//   //           this.errorMessage = 'No inspections found for the current school.';
//   //         }
//   //       },
//   //       error: (err) => {
//   //         this.errorMessage = 'An error occurred while loading inspections. Please try again later.';
//   //       }
//   //     });
//   //   }
//   // }
//   schoolDetails: SchoolDetailsDTO | null = null;
//   inspectorId: number | null = null;
//   schoolId: string | null = null; // Changed to string to match SchoolDetailsDTO
//   inspections: any[] = [];
//   errorMessage: string | null = null;
//   inspectionData: any = {}; // Store inspection data

//   constructor(
//     private router: Router,
//     private authService: AuthService,
//     private inspectionService: InspectionServiceService,
//     private inspectionStateService: InspectionStateService,
//     private mappingService: MappingService,
//     private cd: ChangeDetectorRef,
//   ) {}

//   ngOnInit(): void {
//     this.inspectorId = this.authService.getInspectorId();

//     // Retrieve the navigation state
//     const navigation = this.router.getCurrentNavigation();
//     const state = navigation?.extras.state as { school: SchoolDetailsDTO };

//     if (state && state.school) {
//       this.schoolDetails = state.school;
//       this.schoolId = this.schoolDetails.schoolId;
//     } else {
//       // Fallback to localStorage if state is not available
//       this.schoolId = localStorage.getItem('schoolId');
//       const storedSchool = localStorage.getItem('schoolDetails');
//       if (storedSchool) {
//         this.schoolDetails = JSON.parse(storedSchool);
//       }
//     }

//     if (this.inspectorId && this.schoolId) {
//       // If schoolDetails are already available, no need to fetch again
//       // Otherwise, fetch them
//       if (!this.schoolDetails) {
//         this.fetchSchoolDetails();  // Dynamically fetch school details based on schoolId
//       }
//       this.loadActiveInspections();
//     } else {
//       this.errorMessage = 'Inspector ID or School ID is missing.';
//     }
//   }

//   fetchSchoolDetails(): void {
//     if (!this.inspectorId || !this.schoolId) {
//       this.errorMessage = 'Inspector ID or School ID is missing.';
//       return;
//     }

//     this.mappingService.getSchoolDetailsForInspector(this.inspectorId).subscribe(
//       (data: SchoolDetailsDTO[]) => {
//         // Find the school with the matching schoolId
//         const selectedSchool = data.find(school => school.schoolId === this.schoolId);
//         if (selectedSchool) {
//           this.schoolDetails = selectedSchool;
//         } else {
//           this.errorMessage = 'No school details found for this inspector and school.';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'Failed to load school details: ' + error.error;
//       }
//     );
//   }

//   loadActiveInspections(): void {
    
//     if (this.schoolId) {
//       // Use getAllInspecsByUserAndSchool to fetch all inspections for this school
//       this.inspectionService.getAllInspecsByUserAndSchool(this.schoolId).subscribe({
//         next: (data) => {
//           if (data && data.length > 0) {
//             this.inspections = data;  // Store both active and archived inspections
//           } else {
//             this.errorMessage = 'No inspections found for the current school.';
//           }
//         },
//         error: (err) => {
//           this.errorMessage = 'An error occurred while loading inspections. Please try again later.';
//         }
//       });
//     }
//   }


//   generateReport(inspection: any): void {
//     const doc = new jsPDF();
//     const pageHeight = 297; // A4 page height in mm
//     const margin = 20; // Set a margin for the content
//     let yOffset = 20; // Initial Y position for the first text
  
//     // Helper function to add text and update yOffset
//     const addText = (text: string) => {
//       doc.text(text, 20, yOffset);
//       yOffset += 10;
//       // Check if the current yOffset exceeds the page height, and if so, create a new page
//       if (yOffset > pageHeight - margin) {
//         doc.addPage();  // Add a new page
//         yOffset = 20;   // Reset yOffset to top of the page
//       }
//     };
  
//     // Add School Details
//     doc.setFontSize(16);
//     addText('School Details');
    
//     addText(`School Name: ${this.schoolDetails?.schoolName || 'N/A'}`);
//     addText(`Address: ${this.schoolDetails?.address || 'N/A'}`);
//     addText(`Contact Number: ${this.schoolDetails?.contactNumber || 'N/A'}`);
//     // addText(`Assign Date: ${this.schoolDetails?.assignDate ? new Date(this.schoolDetails.assignDate).toLocaleDateString() : 'N/A'}`);
//     addText(`Assign Date: ${this.schoolDetails?.assignDate ? new Date(this.schoolDetails.assignDate).toLocaleDateString() : 'N/A'}`);

//     // 
//     // Add Inspection Details
//     doc.setFontSize(16);
//     addText('Inspection Summary');
    
//     const formattedAssignDate = this.schoolDetails?.assignDate
//       ? new Date(this.schoolDetails.assignDate).toLocaleDateString()
//       : 'Date not available';
  
//     doc.setFontSize(12);
//     addText(`Inspection ID: ${inspection.id}`);
//     // addText(`Assign Date: ${formattedAssignDate}`);
//     // addText(`Status: ${inspection.status}`);
  
//     addText('General Information');
//     addText(`Type of Inspection: ${inspection.type}`);
//     addText(`Inspector Status: ${inspection.certificationStatus}`);
//     addText(`Notes: ${inspection.notes || ''}`);
  
//     // Check-in Questions Section
//     addText('Check-in Questions');
//     addText(`Front Desk Signature: ${inspection.frontDeskSignature || ''}`);
//     addText(`Kitchen Log: ${inspection.kitchenLog || ''}`);
//     addText(`Staff List: ${inspection.staffList ? 'Yes' : 'No'}`);
//     addText(`DOH Inspection: ${inspection.dohInspection ? 'Yes' : 'No'}`);
//     addText(`Halal Menu: ${inspection.halalMenu ? 'Yes' : 'No'}`);
//     addText(`HACCP Inspection: ${inspection.haccpInspection ? 'Yes' : 'No'}`);
//     addText(`Halal Approved: ${inspection.halalApproved ? 'Yes' : 'No'}`);
//     addText(`Halal Certification: ${inspection.halalCertification ? 'Yes' : 'No'}`);
//     addText(`Breakfast Start Time: ${inspection.breakfastStart || ''}`);
//     addText(`Breakfast End Time: ${inspection.breakfastEnd || ''}`);
//     addText(`Lunch Start Time: ${inspection.lunchStart || ''}`);
//     addText(`Lunch End Time: ${inspection.lunchEnd || ''}`);
//     addText(`Number of Students Served Breakfast: ${inspection.studentsBreakfast || ''}`);
//     addText(`Number of Students Served Lunch: ${inspection.studentsLunch || ''}`);
//     addText(`Total Number of Students Registered: ${inspection.totalStudents || ''}`);
//     addText(`Percentage of Students Consuming Halal: ${inspection.halalPercentage || ''}%`);
//     addText(`Additional Notes: ${inspection.notes || ''}`);
  
//     // Delivery Inspection Section
//     addText('Delivery Inspection');
//     addText(`Incident: ${inspection.incident || ''}`);
//     addText(`Remedy: ${inspection.remedy || ''}`);
//     addText(`Conclusion: ${inspection.conclusion || ''}`);
  
//     // Check if content exceeds page height
//     if (yOffset + 20 > pageHeight - margin) {  // If content exceeds the page space
//       doc.addPage();  // Add new page
//       yOffset = 20; // Reset the Y offset to the top of the next page
//     }
  
//     // Save the PDF
//     doc.save(`inspection-report-${inspection.id}.pdf`);
//   }
  
  
//   // Start a new inspection by soft-deleting previous ones
//   onSave(): void {
//     if (this.inspectorId && this.schoolId) {
//       this.inspectionService.archivePreviousInspections(this.schoolId).subscribe({
//         next: () => {
//           console.log('Previous inspections archived successfully');
//           this.inspectionStateService.clearInspectionData(); // Clear inspection data
//           this.router.navigate(['/general']); // Navigate to the general page
//         },
//         error: (err) => {
//           console.error('Failed to archive previous inspections', err);
//           this.errorMessage = 'Failed to archive previous inspections. Please try again.';
//         }
//       });
//     } else {
//       this.errorMessage = 'Inspector ID or School ID is missing.';
//     }
//   }

//   onNext(): void {
//     this.router.navigate(['/general']);
//   }
// }
// unannounced-certification.component.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InspectionServiceService } from '../services/inspection-service.service';
import { AuthService } from '../auth.service';
import { MappingService } from '../services/mapping.service';
import { InspectionStateService } from '../services/inspection-state-service.service';
import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-unannounced-certification',
  templateUrl: './unannounced-certification.component.html',
  styleUrls: ['./unannounced-certification.component.scss']
})
export class UnannouncedCertificationComponent implements OnInit {
  schoolDetails: SchoolDetailsDTO | null = null;
  inspectorId: number | null = null;
  schoolId: number | null = null;       // Changed to number
  inspections: any[] = [];
  errorMessage: string | null = null;
  inspectionData: any = {};             // Store inspection data

  constructor(
    private router: Router,
    private authService: AuthService,
    private inspectionService: InspectionServiceService,
    private inspectionStateService: InspectionStateService,
    private mappingService: MappingService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.inspectorId = this.authService.getInspectorId();

    // Retrieve the navigation state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { school: SchoolDetailsDTO };

    if (state && state.school) {
      this.schoolDetails = state.school;
      this.schoolId = this.schoolDetails.schoolId;
    } else {
      // Fallback to localStorage if state is not available
      const schoolIdString = localStorage.getItem('schoolId');
      this.schoolId = schoolIdString ? Number(schoolIdString) : null;
      const storedSchool = localStorage.getItem('schoolDetails');
      if (storedSchool) {
        this.schoolDetails = JSON.parse(storedSchool);
      }
    }

    if (this.inspectorId !== null && this.schoolId !== null) {
      // If schoolDetails are already available, no need to fetch again
      // Otherwise, fetch them
      if (!this.schoolDetails) {
        this.fetchSchoolDetails();  // Dynamically fetch school details based on schoolId
      }
      this.loadActiveInspections();
    } else {
      this.errorMessage = 'Inspector ID or School ID is missing.';
    }
  }

  fetchSchoolDetails(): void {
    if (this.inspectorId === null || this.schoolId === null) {
      this.errorMessage = 'Inspector ID or School ID is missing.';
      return;
    }

    this.mappingService.getSchoolDetailsForInspector(this.inspectorId).subscribe(
      (data: SchoolDetailsDTO[]) => {
        // Find the school with the matching schoolId
        const selectedSchool = data.find(school => school.schoolId === this.schoolId);
        if (selectedSchool) {
          this.schoolDetails = selectedSchool;
        } else {
          this.errorMessage = 'No school details found for this inspector and school.';
        }
      },
      (error) => {
        this.errorMessage = 'Failed to load school details: ' + error.error;
      }
    );
  }

  loadActiveInspections(): void {
    console.log(this.schoolId);
    if (this.schoolId !== null) {
      // Use getAllInspecsByUserAndSchool to fetch all inspections for this school
      this.inspectionService.getAllInspecsByUserAndSchool(this.schoolId).subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.inspections = data;  // Store both active and archived inspections
          } else {
            this.errorMessage = 'No inspections found for the current school.';
          }
        },
        error: (err) => {
          this.errorMessage = 'An error occurred while loading inspections. Please try again later.';
        }
      });
    }
  }

  generateReport(inspection: any): void {
    if (!this.schoolDetails) {
      this.errorMessage = 'School details are missing.';
      return;
    }

    const doc = new jsPDF();
    const pageHeight = 297; // A4 page height in mm
    const margin = 20;      // Set a margin for the content
    let yOffset = 20;       // Initial Y position for the first text

    // Helper function to add text and update yOffset
    const addText = (text: string) => {
      doc.text(text, 20, yOffset);
      yOffset += 10;
      // Check if the current yOffset exceeds the page height, and if so, create a new page
      if (yOffset > pageHeight - margin) {
        doc.addPage();  // Add a new page
        yOffset = 20;   // Reset yOffset to top of the page
      }
    };

    // Add School Details
    doc.setFontSize(16);
    addText('School Details');
    
    addText(`School Name: ${this.schoolDetails.schoolName || 'N/A'}`);
    addText(`Address: ${this.schoolDetails.address || 'N/A'}`);
    addText(`Contact Number: ${inspection.contactNumber || 'N/A'}`);
    // addText(`Assign Date: ${this.schoolDetails.assignDate ? new Date(this.schoolDetails.assignDate).toLocaleDateString() : 'N/A'}`);
    addText(`Assign Date: ${inspection.assignDate || 'N/A'}`);
    // Add Inspection Details
    doc.setFontSize(16);
    addText('Inspection Summary');
    
    doc.setFontSize(12);
    addText(`Inspection ID: ${inspection.id}`);
    addText('General Information');
    addText(`Type of Inspection: ${inspection.type}`);
    addText(`Inspector Status: ${inspection.certificationStatus}`);
    addText(`Notes: ${inspection.notes || ''}`);

    // Check-in Questions Section
    addText('Check-in Questions');
    addText(`Front Desk Signature: ${inspection.frontDeskSignature || ''}`);
    addText(`Kitchen Log: ${inspection.kitchenLog || ''}`);
    addText(`Staff List: ${inspection.staffList ? 'Yes' : 'No'}`);
    addText(`DOH Inspection: ${inspection.dohInspection ? 'Yes' : 'No'}`);
    addText(`Halal Menu: ${inspection.halalMenu ? 'Yes' : 'No'}`);
    addText(`HACCP Inspection: ${inspection.haccpInspection ? 'Yes' : 'No'}`);
    addText(`Halal Approved: ${inspection.halalApproved ? 'Yes' : 'No'}`);
    addText(`Halal Certification: ${inspection.halalCertification ? 'Yes' : 'No'}`);
    addText(`Breakfast Start Time: ${inspection.breakfastStart || ''}`);
    addText(`Breakfast End Time: ${inspection.breakfastEnd || ''}`);
    addText(`Lunch Start Time: ${inspection.lunchStart || ''}`);
    addText(`Lunch End Time: ${inspection.lunchEnd || ''}`);
    addText(`Number of Students Served Breakfast: ${inspection.studentsBreakfast || ''}`);
    addText(`Number of Students Served Lunch: ${inspection.studentsLunch || ''}`);
    addText(`Total Number of Students Registered: ${inspection.totalStudents || ''}`);
    addText(`Percentage of Students Consuming Halal: ${inspection.halalPercentage || ''}%`);
    addText(`Additional Notes: ${inspection.notes || ''}`);

    // Delivery Inspection Section
    addText('Delivery Inspection');
    addText(`Incident: ${inspection.incident || ''}`);
    addText(`Remedy: ${inspection.remedy || ''}`);
    addText(`Conclusion: ${inspection.conclusion || ''}`);

    // Check if content exceeds page height
    if (yOffset + 20 > pageHeight - margin) {  // If content exceeds the page space
      doc.addPage();  // Add new page
      yOffset = 20;    // Reset the Y offset to the top of the next page
    }

    // Save the PDF
    doc.save(`inspection-report-${inspection.id}.pdf`);
  }

  // Start a new inspection by archiving previous ones
  onSave(): void {
    if (this.inspectorId !== null && this.schoolId !== null) {
      this.inspectionService.archivePreviousInspections(this.schoolId).subscribe({
        next: () => {
          console.log('Previous inspections archived successfully');
          if (this.schoolId !== null) {
          this.inspectionStateService.clearInspectionData(this.schoolId); // Clear inspection data
          // Clear stored data
          // localStorage.removeItem('schoolId');
          // localStorage.removeItem('schoolDetails');
          this.router.navigate(['/general']); // Navigate to the general page
        }},
        error: (err) => {
          console.error('Failed to archive previous inspections', err);
          this.errorMessage = 'Failed to archive previous inspections. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Inspector ID or School ID is missing.';
    }
  }

  onNext(): void {
    this.router.navigate(['/general']);
  }
}
