import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;

    @Output() pageChange = new EventEmitter<number>();

    onPageChange(newPage: number): void {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.pageChange.emit(newPage);
        }
    }
}
