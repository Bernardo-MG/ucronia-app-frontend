import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Active } from '@app/models/members/active';
import { Person } from '@app/models/person/person';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PaginationInfoWrapperComponent } from '@app/shared/layout/components/pagination-info-wrapper/pagination-info-wrapper.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { JustifyEndDirective } from '@app/shared/style/directives/justify-end.directive';
import { PeopleService } from '../../services/people.service';
import { PeopleListComponent } from '../people-list/people-list.component';

@Component({
  selector: 'assoc-people-frontpage',
  standalone: true,
  imports: [RouterModule, CardModule, ArticleComponent, PeopleListComponent, PaginationInfoWrapperComponent, JustifyEndDirective, JustifyCenterDirective],
  templateUrl: './people-frontpage.component.html'
})
export class PeopleFrontpageComponent {

  public activeFilter = Active.Active;

  public createPermission = false;

  public page = new PaginatedResponse<Person[]>([]);

  private sort = new Sort([]);

  /**
   * Loading flag.
   */
  public reading = false;

  constructor(
    private authContainer: AuthContainer,
    private service: PeopleService
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("person", "create");

    this.load(0);
  }

  public onChangeActiveFilter(active: Active) {
    this.activeFilter = active;
    this.load(0);
  }

  public onChangeDirection(field: SortProperty) {
    if (field.property === 'fullName') {
      this.sort.addField(new SortProperty('firstName', field.direction));
      this.sort.addField(new SortProperty('lastName', field.direction));
    } else {
      this.sort.addField(field);
    }

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  public load(page: number) {
    this.reading = true;

    this.service.getAll(page, this.sort, this.activeFilter).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.reading = false;
      },
      error: error => {
        // Reactivate view
        this.reading = false;
      }
    });
  }

  public routeLinkAdapter(data: Person): string {
    return `${data.number}`;
  }

}
