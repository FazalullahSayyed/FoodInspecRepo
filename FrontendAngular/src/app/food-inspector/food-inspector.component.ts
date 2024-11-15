import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from '../auth.service'; // Service for making API requests
import { InspectionService } from '../services/inspection.service';
@Component({
  selector: 'app-food-inspector',
  templateUrl: './food-inspector.component.html',
  styleUrls: ['./food-inspector.component.scss']
})
export class FoodInspectorComponent implements OnInit {
  inspectorForm!: FormGroup;  // Using '!' to indicate that it's initialized later

  constructor(
    private fb: FormBuilder,
    private InspectionService:InspectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with name, email, location, phoneNumber, and role fields
    this.inspectorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['', Validators.required]  // Added role field
    });
  }

  onSubmit(): void {
    if (this.inspectorForm.valid) {
      this.InspectionService.registerInspector(this.inspectorForm.value).subscribe(
        (res) => {
          alert('Inspector created successfully!');
          this.router.navigate(['/dashboard']); // Navigate to the dashboard or desired route after success
        },
        (err) => {
          alert('Error creating inspector: ' + err.error);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']); // Navigate back to the previous screen
  }
}
