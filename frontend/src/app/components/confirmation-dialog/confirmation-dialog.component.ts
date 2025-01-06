import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-custom-confirmation-dialog',
    imports: [NgIf],
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
})
export class CustomConfirmationDialogComponent {
    @Input() visible: boolean = false;
    @Input() selection: string = '';
    @Input() match: string = '';

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    onConfirm(): void {
        this.confirm.emit();
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
