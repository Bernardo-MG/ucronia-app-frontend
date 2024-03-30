import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/sorting-button/sorting-button.component';
import { GameSystem } from '../../models/game-system';
import { GameSystemService } from '../../services/game-system.service';

@Component({
  selector: 'assoc-library-game-system-list',
  standalone: true,
  imports: [ CommonModule, RouterModule, IconsModule, WaitingWrapperComponent, SortingButtonComponent, PaginationNavigationComponent ],
  templateUrl: './library-game-system-list.component.html'
})
export class LibraryGameSystemListComponent {

  public page = new PaginatedResponse<GameSystem[]>([]);

  /**
   * Loading flag.
   */
  public readingBooks = false;

  private sort = new Sort([]);

  constructor(
    private service: GameSystemService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(0)
  }

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  public onGoTo(page: number) {
    this.load(page);
  }

  private load(page: number) {
    this.readingBooks = true;

    this.service.getAll(page).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.readingBooks = false;
      },
      error: error => {
        // Reactivate view
        this.readingBooks = false;
      }
    });
  }

}
