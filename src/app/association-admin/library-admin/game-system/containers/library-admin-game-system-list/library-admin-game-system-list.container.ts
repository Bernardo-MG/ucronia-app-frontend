
import { Component, inject, Input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GameSystem } from '@app/domain/library/game-system';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'assoc-library-admin-game-system-list',
  imports: [CardModule, RouterModule, TableModule, PanelModule, MenuModule, ButtonModule],
  templateUrl: './library-admin-game-system-list.container.html'
})
export class LibraryAdminGameSystemListContainer {

  private readonly router = inject(Router);

  private readonly service = inject(GameSystemAdminService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  private _pageNumber = 0;

  @Input() public set pageNumber(value: number) {
    this._pageNumber = value;
    this.load(value);
  }

  public get pageNumber() {
    return this._pageNumber;
  }

  public data = new PaginatedResponse<GameSystem>();

  public selectedData = new GameSystem();

  /**
   * Loading flag.
   */
  public loading = false;

  public readonly editable;

  public readonly createable;

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Load books
    this.load(0)

    // Check permissions
    this.createable = authContainer.hasPermission("library_game_system", "create");
    this.editable = authContainer.hasPermission("library_game_system", "update");
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    let direction;
    if (sorting.order == 1) {
      direction = SortingDirection.Ascending;
    } else {
      direction = SortingDirection.Descending;
    }
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onEdit(number: number) {
    this.router.navigate([`/association/admin/library/systems/${number}`]);
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
