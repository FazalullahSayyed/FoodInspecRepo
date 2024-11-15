import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // For navigation after form submission
import { InspectionService } from '../services/inspection.service';
@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.scss']
})
export class InspectionFormComponent implements OnInit {
  inspectionForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private inspectionService: InspectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.inspectionForm = this.fb.group({
      inspectionDate: ['', Validators.required],
      inspectorName: ['', Validators.required],
      inspectionResult: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.inspectionForm.valid) {
      this.inspectionService.createInspection(this.inspectionForm.value).subscribe(
        (res) => {
          alert('Inspection created successfully!');
          this.router.navigate(['/mappings']); // Navigate back to the list page
        },
        (err) => {
          alert('Error creating inspection: ' + err.error);
        }
      );
    }
  }
}
