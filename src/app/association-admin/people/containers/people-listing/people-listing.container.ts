import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Active } from '@app/association/members/model/active';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Person } from '@app/models/person/person';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardFooterComponent } from '@app/shared/card/components/card-footer/card-footer.component';
import { CardHeaderComponent } from '@app/shared/card/components/card-header/card-header.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { PeopleListComponent } from '../../components/people-list/people-list.component';
import { PeopleService } from '../../services/people.service';
import { IconAddComponent } from '@bernardo-mg/icons';

@Component({
    selector: 'assoc-people-listing',
    imports: [RouterModule, ArticleComponent, PeopleListComponent, PaginationInfoComponent, IconAddComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent],
    templateUrl: './people-listing.container.html'
})
export class PeopleListingContainer implements OnInit {

  public activeFilter = Active.Active;

  public createPermission = false;

  public data = new PaginatedResponse<Person[]>([]);

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

    this.load(this.data.page);
  }

  public load(page: number) {
    this.reading = true;

    this.service.getAll(page, this.sort, this.activeFilter).subscribe({
      next: response => {
        this.data = response;

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
