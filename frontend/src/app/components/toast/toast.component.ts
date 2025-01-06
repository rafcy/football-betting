import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [NgClass],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
})
export class ToastComponent {
    @Input() message: string = '';
    @Input() type: 'success' | 'error' = 'success';

    visible: boolean = false;

    showToast(): void {
        this.visible = true;
        setTimeout(() => {
            this.visible = false;
        }, 3000);
    }
}
