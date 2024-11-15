// // src/app/delivery/delivery.component.ts

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { InspectionServiceService } from '../services/inspection-service.service';
// import { AuthService } from '../auth.service';
// import { InspectionStateService } from '../services/inspection-state-service.service';
// import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';
// // import { HttpEventType, HttpResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-delivery',
//   templateUrl: './delivery.component.html',
//   styleUrls: ['./delivery.component.scss']
// })
// export class DeliveryComponent implements OnInit {
//   deliveryForm!: FormGroup;
//   inspectorId: number | null = null;
//   schoolId: number | null = null;
//   selectedFiles: File[] = []; // Store multiple selected files
//   uploadedFileNames: string[] = []; // Store names of successfully uploaded files
//   uploadProgress: number | null = null; // Track upload progress
//   // currentDate: string = ''; // To display assignDate if needed

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private inspectionService: InspectionServiceService,
//     private authService: AuthService,
//     private inspectionStateService: InspectionStateService
//   ) {}

//   ngOnInit(): void {
//     // Retrieve inspectorId from AuthService
//     this.inspectorId = this.authService.getInspectorId();

//     // Retrieve schoolId from localStorage
//     const schoolIdFromStorage = localStorage.getItem('schoolId');
//     this.schoolId = schoolIdFromStorage ? +schoolIdFromStorage : null;
//     if (this.schoolId !== null) {
//     // Initialize the form with validators
//     this.deliveryForm = this.fb.group({
//       incident: ['', Validators.required],
//       remedy: ['', Validators.required],
//       conclusion: ['', Validators.required],
//       additionalNotes: ['']
//       // Add other form controls as needed
//     });

//     // Set current date for assignDate display (optional)
//     // this.currentDate = new Date().toISOString().split('T')[0];

//     // Load existing data from the InspectionStateService

//     const existingData = this.inspectionStateService.getInspectionData(this.schoolId);
//     if (existingData) {
//       this.deliveryForm.patchValue({
//         incident: existingData.incident || '',
//         remedy: existingData.remedy || '',
//         conclusion: existingData.conclusion || '',
//         additionalNotes: existingData.additionalNotes || ''
//         // Patch other fields as necessary
//       });
//     }
    

//     // Update the state service whenever the form changes
//     this.deliveryForm.valueChanges.subscribe(value => {
//       const updatedState = { 
//         ...this.inspectionStateService.getInspectionData(this.schoolId), 
//         ...value 
//       };
//       // Exclude 'files' property to prevent storing image data in the state
//       delete updatedState.files;
//       this.inspectionStateService.updateInspectionData(updatedState,this.schoolId);
//     });
//   }
//   }
//   /**
//    * Handles file selection via the file input.
//    * @param event The file input change event.
//    */
//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files) {
//       const newFiles = Array.from(input.files);
//       newFiles.forEach(file => {
//         if (!this.selectedFiles.find(existingFile => existingFile.name === file.name)) {
//           this.selectedFiles.push(file);
//         }
//       });
//     }
//   }

//   /**
//    * Handles files dropped into the drop zone.
//    * @param event The drag event.
//    */
//   onFileDrop(event: DragEvent): void {
//     event.preventDefault();
//     if (event.dataTransfer) {
//       const files = Array.from(event.dataTransfer.files);
//       files.forEach(file => {
//         if (!this.selectedFiles.find(existingFile => existingFile.name === file.name)) {
//           this.selectedFiles.push(file);
//         }
//       });
//     }
//   }

//   /**
//    * Prevents default behavior for dragover event.
//    * @param event The drag event.
//    */
//   onDragOver(event: DragEvent): void {
//     event.preventDefault();
//   }

//   /**
//    * Triggers the file input click event.
//    */
//   triggerFileSelect(): void {
//     const fileInput = document.getElementById('upload') as HTMLInputElement;
//     if (fileInput) {
//       fileInput.click();
//     }
//   }

//   /**
//    * Removes a selected file from the list.
//    * @param index The index of the file to remove.
//    */
//   removeFile(index: number): void {
//     this.selectedFiles.splice(index, 1);
//   }

//   /**
//    * Handles form submission.
//    */
//   onSubmit(): void {
//     if (this.deliveryForm.invalid) {
//       alert('Please fill out all required fields.');
//       return;
//     }

//     if (!this.inspectorId || !this.schoolId) {
//       alert('Inspector ID or School ID is missing.');
//       return;
//     }

//     // Retrieve school details from the state
//     const schoolDetails: SchoolDetailsDTO | null = this.inspectionStateService.getSchoolDetails();
//     if (!schoolDetails) {
//       alert('School details are missing.');
//       return;
//     }

//     // Prepare the inspection data
//     const stateData = this.inspectionStateService.getInspectionData(this.schoolId);
//     const assignDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
//     const finalData: any = {
//       ...stateData,
//       ...this.deliveryForm.value,
//       assignDate: schoolDetails.assignDate, // Ensure assignDate is set here
//       schoolName: schoolDetails.schoolName,
//       address: schoolDetails.address,
//       contactNumber: schoolDetails.contactNumber
//       // Add other fields as necessary
//     };

//     // Log the finalData to verify assignDate
//     console.log('Submitting Inspection Data:', finalData);

//     // Submit the inspection data along with selected files
//     this.inspectionService.submitInspection(finalData, this.schoolId, this.selectedFiles)
//         .subscribe({
//           next: () => {
//             this.uploadedFileNames = this.selectedFiles.map(file => file.name);
//             this.selectedFiles = []; // Clear the file input after successful upload
//             alert(`Files: ${this.uploadedFileNames.join(', ')} saved successfully.`);
//             this.router.navigate(['/final-summary']);
//           },
//         error: (error) => {
//           console.error('Error submitting inspection:', error);
//           alert('Error submitting inspection form. Please try again.');
//           this.uploadProgress = null; // Reset progress
//         }
//       });
//   }

//   /**
//    * Navigates back to the previous page or a specified route.
//    */
//   goBack(): void {
//     this.router.navigate(['/questions']);
//   }
// }
// src/app/delivery/delivery.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InspectionServiceService } from '../services/inspection-service.service';
import { AuthService } from '../auth.service';
import { InspectionStateService } from '../services/inspection-state-service.service';
import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  deliveryForm!: FormGroup;
  inspectorId: number | null = null;
  schoolId: number | null = null;
  selectedFiles: File[] = []; // Store multiple selected files
  uploadedFileNames: string[] = []; // Store names of successfully uploaded files
  uploadProgress: number | null = null; // Track upload progress
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inspectionService: InspectionServiceService,
    private authService: AuthService,
    private inspectionStateService: InspectionStateService
  ) {}

  ngOnInit(): void {
    // Retrieve inspectorId from AuthService
    this.inspectorId = this.authService.getInspectorId();

    // Retrieve schoolId from localStorage
    const schoolIdFromStorage = localStorage.getItem('schoolId');
    this.schoolId = schoolIdFromStorage ? +schoolIdFromStorage : null;

    if (this.schoolId !== null) {
      const currentSchoolId: number = this.schoolId; // TypeScript infers as number

      // Initialize the form with validators
      this.deliveryForm = this.fb.group({
        incident: ['', Validators.required],
        remedy: ['', Validators.required],
        conclusion: ['', Validators.required],
        additionalNotes: ['']
        // Add other form controls as needed
      });

      // Set current date for assignDate display (optional)
      // this.currentDate = new Date().toISOString().split('T')[0];

      // Load existing data from the InspectionStateService
      const existingData = this.inspectionStateService.getInspectionData(currentSchoolId);
      if (existingData) {
        this.deliveryForm.patchValue({
          incident: existingData.incident || '',
          remedy: existingData.remedy || '',
          conclusion: existingData.conclusion || '',
          additionalNotes: existingData.additionalNotes || ''
          // Patch other fields as necessary
        });
      }

      // Update the state service whenever the form changes
      this.deliveryForm.valueChanges.subscribe(value => {
        const updatedState = { 
          ...this.inspectionStateService.getInspectionData(currentSchoolId), 
          ...value 
        };
        // Exclude 'files' property to prevent storing image data in the state
        delete updatedState.files;
        this.inspectionStateService.updateInspectionData(updatedState, currentSchoolId);
      });
    } else {
      this.errorMessage = 'School ID is missing.';
    }
  }

  /**
   * Handles file selection via the file input.
   * @param event The file input change event.
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      newFiles.forEach(file => {
        if (!this.selectedFiles.find(existingFile => existingFile.name === file.name)) {
          this.selectedFiles.push(file);
        }
      });
    }
  }

  /**
   * Handles files dropped into the drop zone.
   * @param event The drag event.
   */
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      const files = Array.from(event.dataTransfer.files);
      files.forEach(file => {
        if (!this.selectedFiles.find(existingFile => existingFile.name === file.name)) {
          this.selectedFiles.push(file);
        }
      });
    }
  }

  /**
   * Prevents default behavior for dragover event.
   * @param event The drag event.
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   * Triggers the file input click event.
   */
  triggerFileSelect(): void {
    const fileInput = document.getElementById('upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  /**
   * Removes a selected file from the list.
   * @param index The index of the file to remove.
   */
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  /**
   * Handles form submission.
   */
  onSubmit(): void {
    if (this.deliveryForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    if (this.inspectorId === null || this.schoolId === null) {
      alert('Inspector ID or School ID is missing.');
      return;
    }

    // Retrieve school details from the state
    const schoolDetails: SchoolDetailsDTO | null = this.inspectionStateService.getSchoolDetails();
    if (!schoolDetails) {
      alert('School details are missing.');
      return;
    }

    // Prepare the inspection data
    const existingInspectionData = this.inspectionStateService.getInspectionData(this.schoolId);
    const finalData: any = {
      ...existingInspectionData,
      ...this.deliveryForm.value,
      assignDate: schoolDetails.assignDate, // Ensure assignDate is set here
      schoolName: schoolDetails.schoolName,
      address: schoolDetails.address,
      contactNumber: schoolDetails.contactNumber
      // Add other fields as necessary
    };

    // Log the finalData to verify assignDate
    console.log('Submitting Inspection Data:', finalData);

    // Submit the inspection data along with selected files
    this.inspectionService.submitInspection(finalData, this.schoolId, this.selectedFiles)
        .subscribe({
          next: () => {
            this.uploadedFileNames = this.selectedFiles.map(file => file.name);
            this.selectedFiles = []; // Clear the file input after successful upload
            alert(`Files: ${this.uploadedFileNames.join(', ')} saved successfully.`);
            this.router.navigate(['/final-summary']);
          },
        error: (error) => {
          console.error('Error submitting inspection:', error);
          alert('Error submitting inspection form. Please try again.');
          this.uploadProgress = null; // Reset progress
        }
      });
  }

  /**
   * Navigates back to the previous page or a specified route.
   */
  goBack(): void {
    this.router.navigate(['/questions']);
  }
}
