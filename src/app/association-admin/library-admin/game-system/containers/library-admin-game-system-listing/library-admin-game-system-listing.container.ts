
import { Component, inject, Input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameSystem } from '@app/models/library/game-system';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { ArticleComponent, BlockUiDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { GameSystemAdminService } from '../../services/game-system-admin.service';

@Component({
  selector: 'assoc-library-admin-game-system-listing',
  imports: [CardModule, RouterModule, ArticleComponent, SortingButtonComponent, PaginationInfoComponent, IconAddComponent, BlockUiDirective],
  templateUrl: './library-admin-game-system-listing.container.html'
})
export class LibraryAdminGameSystemListingContainer {

  private readonly service = inject(GameSystemAdminService);

  private _pageNumber = 0;

  @Input() public set pageNumber(value: number) {
    this._pageNumber = value;
    this.load(value);
  }

  public get pageNumber() {
    return this._pageNumber;
  }

  public readonly wait = output<boolean>();

  public readonly changePage = output<PaginatedResponse<any>>();

  public data = new PaginatedResponse<GameSystem>();

  /**
   * Loading flag.
   */
  public reading = false;

  public readonly createPermission;

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Load books
    this.load(0)
    // Check permissions
    this.createPermission = authContainer.hasPermission("library_game_system", "create");
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
