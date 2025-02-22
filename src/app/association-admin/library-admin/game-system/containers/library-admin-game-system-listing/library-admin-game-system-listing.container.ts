import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@bernardo-mg/request';
import { Sorting } from '@bernardo-mg/request';
import { SortingProperty } from '@bernardo-mg/request';
import { GameSystem } from '@app/models/library/game-system';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { BlockUiDirective } from '@bernardo-mg/layout';
import { GameSystemAdminService } from '../../services/game-system-admin.service';

@Component({
    selector: 'assoc-library-admin-game-system-listing',
    imports: [CommonModule, RouterModule, SortingButtonComponent, BlockUiDirective],
    templateUrl: './library-admin-game-system-listing.container.html'
})
export class LibraryAdminGameSystemListingContainer implements OnInit, OnChanges {

  @Input() public pageNumber = 0;

  @Output() public wait = new EventEmitter<boolean>();

  @Output() public changePage = new EventEmitter<PaginatedResponse<any[]>>();

  public data: GameSystem[] = [];

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting([]);

  constructor(
    private service: GameSystemAdminService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(0)
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageNumber']) {
      this.load(this.pageNumber);
    }
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.pageNumber);
  }

  public load(page: number) {
    this.reading = true;
    this.wait.emit(this.reading);

    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response.content;
        this.changePage.emit(response);

        // Reactivate view
        this.reading = false;
        this.wait.emit(this.reading);
      },
      error: error => {
        // Reactivate view
        this.reading = false;
        this.wait.emit(this.reading);
      }
    });
  }

}
