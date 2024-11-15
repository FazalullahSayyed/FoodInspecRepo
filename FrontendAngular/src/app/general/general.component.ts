// general.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InspectionServiceService } from '../services/inspection-service.service';
import { AuthService } from '../auth.service';
import { InspectionStateService } from '../services/inspection-state-service.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  inspectionForm: FormGroup;
  inspectorId: number | null = null;
  schoolId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inspectionService: InspectionServiceService,
    private authService: AuthService,
    private inspectionStateService: InspectionStateService
  ) {
    this.inspectionForm = this.fb.group({
      type: ['', Validators.required],
      certificationStatus: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    // Retrieve inspectorId and schoolId
    this.inspectorId = this.authService.getInspectorId();
    const schoolIdFromStorage = localStorage.getItem('schoolId');
    this.schoolId = schoolIdFromStorage ? +schoolIdFromStorage : null;
    console.log(this.schoolId);
    // Load existing data from InspectionStateService
    if (this.inspectorId !== null && this.schoolId !== null) {
      // Load existing data from InspectionStateService
      const savedData = this.inspectionStateService.getInspectionData(this.schoolId);
      if (savedData) {
        this.inspectionForm.patchValue(savedData);
      }

      // Subscribe to form changes and update the state service
      this.inspectionForm.valueChanges.subscribe(value => {
        this.inspectionStateService.updateInspectionData(this.schoolId!, value);
      });
    } else {
      alert('Inspector ID or School ID is missing.');
    }
  }

  //   const savedData = this.inspectionStateService.getInspectionData();
  //   if (savedData) {
  //     this.inspectionForm.patchValue(savedData);
  //   }

  //   // Subscribe to form changes and update the state service
  //   this.inspectionForm.valueChanges.subscribe(value => {
  //     this.inspectionStateService.updateInspectionData(value);
  //   });

  //   // Note: Removed the code that fetches data from the backend
  // }

  onSubmit() {
    if (this.inspectionForm.valid && this.inspectorId && this.schoolId) {
      const formData = this.inspectionForm.value;
      console.log('Form Data to be submitted:', formData);
      this.inspectionStateService.updateInspectionData(formData,this.schoolId);
      alert('Inspection submitted successfully!');
    } else {
      alert('The form is invalid or essential IDs are missing.');
    }
  }

  onNext() {
    if (this.schoolId !== null) {
    const formData = this.inspectionForm.value;

    this.inspectionStateService.updateInspectionData(formData,this.schoolId);
    this.router.navigate(['/questions']);
  }
}

  onBack() {
    this.router.navigate(['/UnannouncedCertificationComponent']);
  }
}
