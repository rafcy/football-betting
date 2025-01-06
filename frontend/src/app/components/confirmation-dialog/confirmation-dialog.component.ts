import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatButtonModule,
        MatDialogModule,
    ],
    templateUrl: './confirmation-dialog.component.html',
    styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { selection: string; match: string }
    ) {}

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
