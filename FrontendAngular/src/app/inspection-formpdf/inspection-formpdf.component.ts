import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InspectionStateService } from '../services/inspection-state-service.service';
import { MappingService } from '../services/mapping.service';
import { Router } from '@angular/router';
import { SchoolDetailsDTO } from '../models/SchoolDetailsDTO';
import { AuthService } from '../auth.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-inspection-formpdf',
  templateUrl: './inspection-formpdf.component.html',
  styleUrls: ['./inspection-formpdf.component.scss']
})
export class InspectionFormpdfComponent implements OnInit {
  inspectionForm!: FormGroup;
  checkInForm!: FormGroup;
  deliveryForm!: FormGroup;
  inspectionData: any;
  schoolDetails: SchoolDetailsDTO | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  schoolId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private inspectionStateService: InspectionStateService,
    private mappingService: MappingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // this.inspectorId = this.authService.getInspectorId();
    const schoolIdFromStorage = localStorage.getItem('schoolId');
    this.schoolId = schoolIdFromStorage !== null ? +schoolIdFromStorage : null;
    // Initialize Inspection Form
    this.inspectionForm = this.fb.group({
      type: ['', Validators.required],
      status: ['', Validators.required],
      notes: ['']
    });

    // Initialize Check-in Form
    this.checkInForm = this.fb.group({
      frontDeskSignature: ['', Validators.required],
      kitchenLog: ['', Validators.required],
      staffList: [false],
      dohInspection: [false],
      halalMenu: [false],
      haccpInspection: [false],
      halalApproved: [false],
      halalCertification: [false],
      breakfastStart: ['', Validators.required],
      breakfastEnd: ['', Validators.required],
      lunchStart: ['', Validators.required],
      lunchEnd: ['', Validators.required],
      studentsBreakfast: [0, [Validators.required, Validators.min(0)]],
      studentsLunch: [0, [Validators.required, Validators.min(0)]],
      totalStudents: [0, [Validators.required, Validators.min(0)]],
      halalPercentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      notes: ['']
    });

    // Initialize Delivery Form
    this.deliveryForm = this.fb.group({
      incident: ['', Validators.required],
      remedy: ['', Validators.required],
      conclusion: ['', Validators.required]
    });
    if (this.schoolId !== null) {
    // Load inspection data from the state service, if available
    this.inspectionData = this.inspectionStateService.getInspectionData(this.schoolId);
    if (this.inspectionData) {
      this.inspectionForm.patchValue(this.inspectionData);
      this.checkInForm.patchValue(this.inspectionData);
      this.deliveryForm.patchValue(this.inspectionData);
    }

    // Retrieve school details from the state service if already set
    const storedSchoolDetails = this.inspectionStateService.getSchoolDetails();
    if (storedSchoolDetails) {
      this.schoolDetails = storedSchoolDetails;
    } else {
      // Fetch school details based on the inspectorId
      const inspectorId = this.authService.getInspectorId();
      if (inspectorId) {
        this.fetchSchoolDetails(inspectorId);
      } else {
        console.error('No inspectorId found');
        this.errorMessage = 'Inspector ID not found. Unable to retrieve school details.';
      }
    }
  }}

  // Fetch school details using inspectorId
  fetchSchoolDetails(inspectorId: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.mappingService.getSchoolDetailsForInspector(inspectorId).subscribe(
      (data: SchoolDetailsDTO[]) => {
        if (Array.isArray(data) && data.length > 0) {
          this.schoolDetails = data[0];
          this.inspectionStateService.setSchoolDetails(this.schoolDetails); // Store in state service
          this.isLoading = false;
        } else {
          this.schoolDetails = null;
          this.isLoading = false;
          this.errorMessage = 'No school details found for this inspector.';
        }
      },
      (error) => {
        console.error('Error fetching school details:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load school details: ' + (error.error?.message || error.message);
      }
    );
  }

  // Handle form submission
  onSubmit(): void {
    if (this.inspectionForm.valid && this.checkInForm.valid && this.deliveryForm.valid) {
      // Update inspection state with all form values
      this.inspectionStateService.updateInspectionData(this.schoolId,{
        ...this.inspectionForm.value,
        ...this.checkInForm.value,
        ...this.deliveryForm.value
      });
      if (this.schoolId !== null) {
      // Update local inspection data to reflect the state
      this.inspectionData = this.inspectionStateService.getInspectionData(this.schoolId);
      }
      console.log('Forms submitted successfully');
      this.generatePDF(); // Generate the PDF after successful submission
    } else {
      console.error('Forms are not valid');
      alert('Please fill in all required fields before generating the PDF.');
    }
  }

  // Generate PDF of the inspection summary
  generatePDF(): void {
    const element = document.getElementById('pdf-summary-content');

    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('inspection-summary.pdf');
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('PDF summary content element not found');
    }
  }

  // Navigate back to the general page
  goBack(): void {
    this.router.navigate(['/general']);
  }

  // Optional: Handle additional back actions
  onBack(): void {
    console.log('Back button clicked');
  }
}
