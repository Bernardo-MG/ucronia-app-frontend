import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MembershipEvolutionChartWidgetContainer } from '@app/association-admin/people/membership-evolution-chart-widget/membership-evolution-chart-widget.container';
import { Active } from '@app/domain/person/active';
import { Membership } from '@app/domain/person/membership';
import { Person } from '@app/domain/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { Menu, MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { debounceTime, finalize, Observable, Subject, throwError } from 'rxjs';
import { PeopleCreationForm } from '../people-creation-form/people-creation-form';
import { PeopleEditionForm } from '../people-edition-form/people-edition-form';
import { PeopleInfo } from '../people-info/people-info';
import { PeopleService } from '../people-service';
import { PersonStatusSelect } from '../person-status-select/person-status-select';

@Component({
  selector: 'assoc-people-list',
  imports: [FormsModule, PanelModule, MenuModule, CardModule, ButtonModule, DrawerModule, RouterModule, TableModule, IconAddComponent, PersonStatusSelect, PeopleCreationForm, PeopleEditionForm, PeopleInfo, MembershipEvolutionChartWidgetContainer, JustifyCenterDirective],
  templateUrl: './people-list.html'
})
export class PeopleList implements OnInit {

  private readonly router = inject(Router);

  private readonly service = inject(PeopleService);

  private readonly confirmationService = inject(ConfirmationService);

  @ViewChild('personEditionMenu') personEditionMenu!: Menu;

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public activeFilter = Active.Active;

  public readonly createable;
  public readonly editable;

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
  public showing = false;

  public view: string = '';

  public failures = new FailureStore();

  public personEditionMenuItems: MenuItem[] = [];

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("person", "create");
    this.editable = authContainer.hasPermission("person", "update");

    this.nameFilterSubject
      .pipe(debounceTime(300))
      .subscribe(() => this.load(0));
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public openEditionMenu(event: Event, person: Person) {
    this.selectedData = person;

    // Rebuild menu items dynamically
    this.personEditionMenuItems = [];

    // Edit option is always available
    this.personEditionMenuItems.push({
      label: 'Editar',
      command: () => this.onStartEditingView('edition')
    });

    // Determine current membership values (default to active=true, renew=true if undefined)
    const isActive = !!this.selectedData.membership?.active;
    const canRenew = !!this.selectedData.membership?.renew;

    // Active/Deactivate toggle
    this.personEditionMenuItems.push({
      label: isActive ? 'Desactivar' : 'Activar',
      command: () => this.onConfirmSetActive(event, !isActive)
    });

    // Renewal toggle
    this.personEditionMenuItems.push({
      label: canRenew ? 'Desactivar renovación' : 'Activar renovación',
      command: () => this.onConfirmSetRenewal(event, !canRenew)
    });

    // Show menu
    this.personEditionMenu.toggle(event);
  }

  public onConfirmSetActive(event: Event, status: boolean) {
    let message;
    if (status) {
      message = '¿Estás seguro de querer activar el usuario?';
    } else {
      message = '¿Estás seguro de querer desactivar el usuario?';
    }
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message,
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => {
        this.onSetActive(status);
      }
    });
  }

  public onConfirmSetRenewal(event: Event, status: boolean) {
    let message;
    if (status) {
      message = '¿Estás seguro de querer activar la renovación del usuario?';
    } else {
      message = '¿Estás seguro de querer desactivar la renovación del usuario?';
    }
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message,
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => {
        this.onSetRenewal(status);
      }
    });
  }

  public onSetActive(status: boolean) {
    if (this.selectedData.membership === undefined) {
      this.selectedData.membership = new Membership();
    }
    this.selectedData.membership.active = status;
    this.selectedData.membership.renew = status;
    this.onUpdate(this.selectedData);
  }

  public onSetRenewal(status: boolean) {
    if (this.selectedData.membership === undefined) {
      this.selectedData.membership = new Membership();
    }
    this.selectedData.membership.renew = status;
    this.onUpdate(this.selectedData);
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

  public onConfirmDelete(event: Event, number: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => {
        this.mutate(() => this.service.delete(number));
      }
    });
  }

  public onShowInfo(person: Person) {
    this.selectedData = person;
    this.showing = true;
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

  public onUpdate(toUpdate: Person): void {
    this.mutate(() => this.service.patch(this.selectedData.number, toUpdate));
  }

  private mutate(action: () => Observable<any>) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
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
          return throwError(() => error);
        }
      });
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}