import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InspectionServiceService } from '../services/inspection-service.service';
import { AuthService } from '../auth.service';
import { InspectionStateService } from '../services/inspection-state-service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  checkInForm!: FormGroup;
  inspectorId: number | null = null;
  schoolId: number | null = null;

  constructor(
    private router: Router,
    private inspectionService: InspectionServiceService,
    private authService: AuthService,
    private inspectionStateService: InspectionStateService
  ) {}

  ngOnInit(): void {
    // Retrieve inspectorId and schoolId
    this.inspectorId = this.authService.getInspectorId();
    const schoolIdFromStorage = localStorage.getItem('schoolId');
    this.schoolId = schoolIdFromStorage !== null ? +schoolIdFromStorage : null;
    if (this.inspectorId !== null && this.schoolId !== null) {
    // Initialize form controls
    this.checkInForm = new FormGroup({
      frontDeskSignature: new FormControl(null, Validators.required),
      kitchenLog: new FormControl(null, Validators.required),
      staffList: new FormControl(false),
      dohInspection: new FormControl(false),
      halalMenu: new FormControl(false),
      haccpInspection: new FormControl(false),
      halalApproved: new FormControl(false),
      halalCertification: new FormControl(false),
      breakfastStart: new FormControl(null, Validators.required),
      breakfastEnd: new FormControl(null, Validators.required),
      lunchStart: new FormControl(null, Validators.required),
      lunchEnd: new FormControl(null, Validators.required),
      studentsBreakfast: new FormControl(null, [Validators.required, Validators.min(1)]),
      studentsLunch: new FormControl(null, [Validators.required, Validators.min(1)]),
      totalStudents: new FormControl(null, [Validators.required, Validators.min(1)]),
      halalPercentage: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
      notes: new FormControl('')
    });

    // Load existing data from InspectionStateService
    const savedData = this.inspectionStateService.getInspectionData(this.schoolId);
    if (savedData) {
      this.checkInForm.patchValue(savedData);
    }

    // Subscribe to form changes and update the state service
    // this.checkInForm.valueChanges.subscribe(value => {
    //   const currentState = this.inspectionStateService.getInspectionData(this.schoolId) || {};
    //   const updatedState = { ...currentState, ...value };
    //   this.inspectionStateService.updateInspectionData(updatedState);
    // });

    this.checkInForm.valueChanges.subscribe(value => {
      this.inspectionStateService.updateInspectionData(this.schoolId!, value);
    });
  } else {
    alert('Inspector ID or School ID is missing.');
  }
    // Note: Removed the code that fetches data from the backend
  }
  
  onSubmit(): void {
    if (this.checkInForm.valid && this.inspectorId && this.schoolId) {
      const formData = this.checkInForm.value;
      this.inspectionStateService.updateInspectionData(this.schoolId, formData); // Save form data to state service (and localStorage)
      alert('Inspection submitted successfully!');
      
      // Uncomment this block if submission to a service endpoint is required
      /*
      this.inspectionService.submitInspection(formData, this.schoolId)
        .subscribe(
          (response) => {
            console.log('Inspection submitted successfully', response);
            alert('Form submitted successfully!');
            this.router.navigate(['/delivery']);
          },
          (error) => {
            console.error('Error submitting inspection', error);
            alert('There was an error submitting the form. Please try again.');
          }
        );
      */
    } else {
      alert('Form is invalid or required IDs not found.');
    }
  }

  goBack() {
    if (this.schoolId !== null) {
    this.inspectionStateService.updateInspectionData(this.checkInForm.value,this.schoolId);
    this.router.navigate(['/general']);
  }}

  goNext() {
    if (this.schoolId !== null) {
    this.inspectionStateService.updateInspectionData(this.checkInForm.value,this.schoolId); // Update shared state before navigating
    this.router.navigate(['/delivery']);
  }}
}
