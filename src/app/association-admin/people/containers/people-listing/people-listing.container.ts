import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Active } from '@app/association/members/model/active';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Person } from '@app/models/person/person';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { PeopleListComponent } from '../../components/people-list/people-list.component';
import { PeopleService } from '../../services/people.service';

@Component({
    selector: 'assoc-people-listing',
    imports: [RouterModule, ArticleComponent, PeopleListComponent, PaginationInfoComponent, IconAddComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent],
    templateUrl: './people-listing.container.html'
})
export class PeopleListingContainer implements OnInit {

  public activeFilter = Active.Active;

  public createPermission = false;

  public data = new PaginatedResponse<Person[]>([]);

  private sort = new Sorting([]);

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

  public onChangeDirection(field: SortingProperty) {
    if (field.property === 'fullName') {
      this.sort.addField(new SortingProperty('firstName', field.direction));
      this.sort.addField(new SortingProperty('lastName', field.direction));
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
