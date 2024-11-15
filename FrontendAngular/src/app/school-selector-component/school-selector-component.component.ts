import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-school-selector',
  template: `
    <h2>Select School</h2>
    <mat-selection-list #schoolList>
      <mat-list-option *ngFor="let school of data.schools" [value]="school.id">
        {{ school.name }}
      </mat-list-option>
    </mat-selection-list>
    <button mat-button color="primary" (click)="onSelect(schoolList.selectedOptions.selected[0].value)">Select</button>
    <button mat-button (click)="onCancel()">Cancel</button>
  `
})
export class SchoolSelectorComponent {
  constructor(
    public dialogRef: MatDialogRef<SchoolSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { schools: any[] }
  ) {}

  onSelect(schoolId: number | undefined): void {
    this.dialogRef.close(schoolId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
