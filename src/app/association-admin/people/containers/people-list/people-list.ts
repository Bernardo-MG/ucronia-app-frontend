import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PersonStatusSelect } from '@app/association-admin/people/components/person-status-select/person-status-select';
import { Active } from '@app/domain/person/active';
import { Person } from '@app/domain/person/person';
import { MembershipEvolutionChartWidgetContainer } from '@app/widget/membership-evolution/containers/membership-evolution-chart-widget/membership-evolution-chart-widget.container';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { debounceTime, Observable, Subject, throwError } from 'rxjs';
import { PeopleCreationForm } from '../../components/people-creation-form/people-creation-form';
import { PeopleService } from '../../services/people-service';

@Component({
  selector: 'assoc-people-list',
  imports: [FormsModule, PanelModule, CardModule, ButtonModule, DrawerModule, RouterModule, TableModule, IconAddComponent, PersonStatusSelect, PeopleCreationForm, MembershipEvolutionChartWidgetContainer, JustifyCenterDirective],
  templateUrl: './people-list.html'
})
export class PeopleList {

  private readonly router = inject(Router);

  private readonly service = inject(PeopleService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public activeFilter = Active.Active;

  public readonly createable;

  public data = new PaginatedResponse<Person>();

  public nameFilter = '';

  public nameFilterSubject = new Subject<string>();

  public selectedData = new Person();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public saving = false;

  public view: string = '';

  public failures = new FailureStore();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("person", "create");

    this.nameFilterSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.load(0);
    });

    this.load(0);
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
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

  public onSelectRow() {
    this.router.navigate([`/association/admin/people/${this.selectedData.number}`]);
  }

  public onNameFilterChange(): void {
    this.load(0);
  }

  public onCreate(toCreate: Person): void {
    this.mutate(() => this.service.create(toCreate));
  }

  private mutate(action: () => Observable<any>) {
    this.loading = true;
    action().subscribe({
      next: () => {
        this.failures.clear();
        this.view = 'none';
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        this.loading = false;
        return throwError(() => error);
      }
    });
  }

  private load(page: number) {
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

}
