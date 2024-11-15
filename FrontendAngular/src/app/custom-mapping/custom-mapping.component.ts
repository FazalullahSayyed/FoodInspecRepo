import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MappingService } from '../services/mapping.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-custom-mapping',
  templateUrl: './custom-mapping.component.html',
  styleUrls: ['./custom-mapping.component.scss']
})
export class CustomMappingComponent implements OnInit {
  mappingForm!: FormGroup;
  editingElementId: number | null = null;
  editedData: any = {};
  schools: any[] = [];
  inspectors: any[] = []; // Stores only inspectors with role USER
  mappings: any[] = [];
  displayedColumns: string[] = ['school', 'assignDate', 'inspectorName', 'actions'];

  constructor(
    private fb: FormBuilder,
    private mappingService: MappingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSchoolsAndInspectors();
    this.loadMappings();
  }

  initializeForm(): void {
    this.mappingForm = this.fb.group({
      schoolId: [null, Validators.required],
      inspectorId: [null, Validators.required],
      assignDate: [null, Validators.required],
    });
  }

  loadSchoolsAndInspectors(): void {
    forkJoin([this.mappingService.getAllSchools(), this.mappingService.getAllInspectors()])
      .subscribe(
        ([schools, inspectors]) => {
          this.schools = schools;
          // Filter inspectors to include only those with role 'USER'
          this.inspectors = inspectors.filter((inspector: any) => inspector.role === 'USER');
        },
        (err) => {
          alert('Error loading dropdown data: ' + err.error);
        }
      );
  }

  loadMappings(): void {
    this.mappingService.getAllMappings().subscribe((res) => {
      this.mappings = res;
    });
  }

  onSubmit(): void {
    if (this.editingElementId) {
      this.saveEdit();
    } else {
      this.createMapping();
    }
  }

  createMapping(): void {
    if (this.mappingForm.valid) {
      const mappingData = this.mappingForm.value;
      this.mappingService.mapInspectorToSchool(mappingData).subscribe(
        () => {
          alert('Mapping created successfully!');
          this.loadMappings();
          this.resetForm();
        },
        (err) => {
          alert('Error creating mapping: ' + err.error);
        }
      );
    }
  }

  editMapping(element: any): void {
    this.editingElementId = element.id;
    this.editedData = { ...element };

    // Populate form fields with existing data
    this.mappingForm.patchValue({
      schoolId: element.schoolId,
      inspectorId: element.inspectorId,
      assignDate: element.assignDate
    });
  }

  saveEdit(): void {
    if (this.editingElementId && this.editedData) {
      this.mappingService.updateMapping(this.editingElementId, this.editedData).subscribe(
        () => {
          alert('Mapping updated successfully!');
          this.loadMappings();
          this.cancelEdit();
        },
        (err) => {
          alert('Error updating mapping: ' + err.error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editingElementId = null;
    this.editedData = {};
  }

  resetForm(): void {
    this.mappingForm.reset();
    this.editingElementId = null;
  }

  removeMapping(mappingId: number): void {
    this.mappingService.removeMapping(mappingId).subscribe(() => {
      alert('Mapping removed successfully!');
      this.loadMappings();
    });
  }
}
