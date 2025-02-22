import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { GameSystem } from '@app/models/library/game-system';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, BlockUiDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { GameSystemAdminService } from '../../services/game-system-admin.service';

@Component({
  selector: 'assoc-library-admin-game-system-listing',
  imports: [CommonModule, RouterModule, ArticleComponent, SortingButtonComponent, PaginationInfoComponent, IconAddComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, BlockUiDirective],
  templateUrl: './library-admin-game-system-listing.container.html'
})
export class LibraryAdminGameSystemListingContainer implements OnInit, OnChanges {

  @Input() public pageNumber = 0;

  @Output() public wait = new EventEmitter<boolean>();

  @Output() public changePage = new EventEmitter<PaginatedResponse<any>>();

  public data = new PaginatedResponse<GameSystem>();

  /**
   * Loading flag.
   */
  public reading = false;

  public createPermission = false;

  private sort = new Sorting([]);

  constructor(
    private authContainer: AuthContainer,
    private service: GameSystemAdminService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(0)
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_game_system", "create");
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
        this.data = response;
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
