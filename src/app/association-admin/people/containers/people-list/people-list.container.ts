import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PersonStatusSelectComponent } from '@app/association-admin/people/components/person-status-select/person-status-select.component';
import { Active } from '@app/models/person/active';
import { Person } from '@app/models/person/person';
import { MembershipEvolutionChartWidgetContainer } from '@app/widget/membership-evolution/containers/membership-evolution-chart-widget/membership-evolution-chart-widget.container';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { debounceTime, Subject } from 'rxjs';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'assoc-people-list',
  imports: [FormsModule, CardModule, RouterModule, TableModule, IconAddComponent, PersonStatusSelectComponent, MembershipEvolutionChartWidgetContainer, JustifyCenterDirective],
  templateUrl: './people-list.container.html'
})
export class PeopleListingContainer {

  private readonly router = inject(Router);

  private readonly service = inject(PeopleService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public activeFilter = Active.Active;

  public readonly createPermission;

  public data = new PaginatedResponse<Person>();

  public nameFilter = '';

  public nameFilterSubject = new Subject<string>();

  public selectedPerson = new Person();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createPermission = authContainer.hasPermission("person", "create");

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

  public onChangeDirection(sorting: { field: string, order: number }) {
    let direction;
    if (sorting.field === 'fullName') {
      if (sorting.order == 1) {
        direction = SortingDirection.Ascending;
      } else {
        direction = SortingDirection.Descending;
      }
      this.sort.addField(new SortingProperty('firstName', direction));
      this.sort.addField(new SortingProperty('lastName', direction));
    } else {
      if (sorting.order == 1) {
        direction = SortingDirection.Ascending;
      } else {
        direction = SortingDirection.Descending;
      }
      this.sort.addField(new SortingProperty(sorting.field, direction));
    }

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onSelectPerson() {
    this.router.navigate([`/association/admin/people/${this.selectedPerson.number}`]);
  }

  public onNameFilterChange(): void {
    this.load(0);
  }

  public load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter).subscribe({
      next: response => {
        this.data = response;
        this.loading = false;
      },
      error: error => {
        this.loading = false;
      }
    });
  }

  public routeLinkAdapter(data: Person): string {
    return `${data.number}`;
  }

}
