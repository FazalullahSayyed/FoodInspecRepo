import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inspector-selector',
  template: `
    <h2>Select Inspector</h2>
    <mat-selection-list #inspectorList>
      <mat-list-option *ngFor="let inspector of data.inspectors" [value]="inspector.id">
        {{ inspector.name }}
      </mat-list-option>
    </mat-selection-list>
    <button mat-button color="primary" (click)="onSelect(inspectorList.selectedOptions.selected[0].value)">Select</button>
    <button mat-button (click)="onCancel()">Cancel</button>
  `
})
export class InspectorSelectorComponent {
  constructor(
    public dialogRef: MatDialogRef<InspectorSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inspectors: any[] }
  ) {}

  onSelect(inspectorId: number | undefined): void {
    this.dialogRef.close(inspectorId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
