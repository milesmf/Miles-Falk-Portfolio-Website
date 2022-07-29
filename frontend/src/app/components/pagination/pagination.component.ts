import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input('totalPages') public totalPages!: number;
  @Input('currentPage') public currentPage!: number;
  @Input('nextPage') public nextPage!: number;
  @Input('previousPage') public previousPage!: number;


  @Output() paginateClicked = new EventEmitter<number>();

  constructor() { }

  public toggleActivePage(page: number): void {
    if (this.currentPage !== page) this.paginateClicked.emit(page);
  }

}
