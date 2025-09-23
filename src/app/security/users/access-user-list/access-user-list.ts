import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer, User } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { AccessUserForm } from '../access-user-form/access-user-form';
import { AccessUserInfo } from '../access-user-info/access-user-info';
import { AccessUserService } from '../access-user-service';

@Component({
  selector: 'access-user-list',
  imports: [CardModule, RouterModule, TableModule, ButtonModule, PanelModule, DrawerModule, AccessUserForm, AccessUserInfo],
  templateUrl: './access-user-list.html'
})
export class AccessList implements OnInit {

  private readonly router = inject(Router);
  private readonly service = inject(AccessUserService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  public readonly createable;
  public readonly editable;

  public showing = false;
  public showForm = false;

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<User>();

  public selectedData = new User();

  /**
   * Loading flag.
   */
  public loading = false;

  public view: string = '';

  private sort = new Sorting();

  public failures = new FailureStore();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("user", "create");
    this.editable = authContainer.hasPermission("user", "update");
  }

  public ngOnInit(): void {
    this.load(0);
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

  public onSelectRow() {
    this.router.navigate([`/security/users/${this.selectedData.username}`]);
  }

  public onShowInfo(user: User) {
    this.selectedData = user;
    this.showing = true;
  }

  public onCreate(toCreate: any): void {
    this.mutate(() => this.service.create(toCreate));
  }

  public onUpdate(toUpdate: any): void {
    this.mutate(() => this.service.update(toUpdate));
  }

  public onCancel(): void {
    this.view = 'none';
  }

  public onDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Quieres borrar estos datos?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.mutate(() => this.service.delete(id));
        return this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
      }
    });
  }

  public onStartCreating(): void {
    this.view = 'creation';
    this.showForm = true;
  }

  public onStartEditing(item: any): void {
    this.selectedData = item;
    this.view = 'edition';
    this.showForm = true;
  }

  private load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
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

}
