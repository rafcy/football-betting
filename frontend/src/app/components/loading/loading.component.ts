import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
    ],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
})
export class LoadingComponent {
    @Input() message: string = 'Loading events...';
    @Input() showSpinner: boolean = true;
}
