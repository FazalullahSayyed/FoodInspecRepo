import { Component, Inject, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-school-management',
  templateUrl: './school-management.component.html',
  styleUrls: ['./school-management.component.scss']
})
export class SchoolManagementComponent implements OnInit {
  schoolForm!: FormGroup;
  isEditMode = false;
  schoolId: number | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(SchoolService) private schoolService: SchoolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.schoolForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      principalName: ['', Validators.required],
      establishedYear: ['', Validators.required],
      accreditation: [''],
      notes: ['']
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.schoolId = +idParam; // Convert to number
        this.isEditMode = true;
        this.loadSchoolDetails();
      }
    });
  }

  loadSchoolDetails(): void {
    this.schoolService.getSchoolById(this.schoolId!).subscribe(
      (data) => {
        this.schoolForm.patchValue(data);
      },
      (error) => {
        alert('Error loading school details: ' + error.error);
      }
    );
  }

  onSubmit(): void {
    if (this.schoolForm.valid) {
      const schoolData = this.schoolForm.value;
      if (this.isEditMode) {
        this.schoolService.updateSchool(this.schoolId!, schoolData).subscribe(() => {
          alert('School/Institute updated successfully');
          this.router.navigate(['/dashboard']);
        }, (error) => {
          alert('Error updating school: ' + error.error);
        });
      } else {
        this.schoolService.createSchool(schoolData).subscribe(() => {
          alert('School/Institute created successfully');
          this.router.navigate(['/dashboard']);
        }, (error) => {
          alert('Error creating school: ' + error.error);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
