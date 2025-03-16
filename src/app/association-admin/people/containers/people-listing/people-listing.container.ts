import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Active } from '@app/models/person/active';
import { Person } from '@app/models/person/person';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { PersonStatusSelectComponent } from '@app/association-admin/people/components/person-status-select/person-status-select.component';
import { MembershipEvolutionChartWidgetContainer } from '@app/widget/membership-evolution/containers/membership-evolution-chart-widget/membership-evolution-chart-widget.container';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, JustifyCenterDirective } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { debounceTime, Subject } from 'rxjs';
import { PeopleListComponent } from '../../components/people-list/people-list.component';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'assoc-people-listing',
  imports: [FormsModule, RouterModule, ArticleComponent, PeopleListComponent, PaginationInfoComponent, IconAddComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, PersonStatusSelectComponent, MembershipEvolutionChartWidgetContainer, JustifyCenterDirective],
  templateUrl: './people-listing.container.html'
})
export class PeopleListingContainer implements OnInit {

  private authContainer = inject(AuthContainer);

  private service = inject(PeopleService);

  public activeFilter = Active.Active;

  public createPermission = false;

  public data = new PaginatedResponse<Person>();

  public nameFilter = '';

  public nameFilterSubject = new Subject<string>();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public reading = false;

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("person", "create");

    this.nameFilterSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.load(0);
    });

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

  public onNameFilterChange(): void {
    this.load(0);
  }

  public load(page: number) {
    this.reading = true;

    this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter).subscribe({
      next: response => {
        this.data = response;
        this.reading = false;
      },
      error: error => {
        this.reading = false;
      }
    });
  }

  public routeLinkAdapter(data: Person): string {
    return `${data.number}`;
  }

}
