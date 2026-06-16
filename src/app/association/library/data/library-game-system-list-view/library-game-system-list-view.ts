
import { Component, inject, OnInit } from '@angular/core';
import { NameForm } from '@app/shared/data/name-form/name-form';
import { NameList } from '@app/shared/data/name-list/name-list';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { DetailField } from '@bernardo-mg/ui';
import { GameSystem } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize, Observable } from 'rxjs';
import { GameSystemService } from '../game-system-service';

@Component({
  imports: [NameList, DrawerModule, ButtonModule, NameForm, DetailField],
  templateUrl: './library-game-system-list-view.html'
})
export class LibraryGameSystemListView implements OnInit {

  private readonly service = inject(GameSystemService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly permissions: Permissions;

  public data = new Page<GameSystem>();
  public loading = false;
  public failures = new FailureStore();
  public drawer = Drawer.NONE;
  public readonly Drawer = Drawer;
  public selected = new GameSystem();
  private sort = new Sorting();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission('library_game_system', 'create'),
      edit: authService.hasPermission('library_game_system', 'update'),
      delete: authService.hasPermission('library_game_system', 'delete')
    };
  }

  ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onShowCreate(): void {
    this.selected = new GameSystem();
    this.drawer = Drawer.CREATION;
    this.failures.clear();
  }

  public onShowInfo(item: any): void {
    this.selected = item;
    this.drawer = Drawer.INFO;
    this.failures.clear();
  }

  public onShowEdit(item: any): void {
    this.selected = item;
    this.drawer = Drawer.EDITION;
    this.failures.clear();
  }

  public onReject(): void {
    this.drawer = Drawer.NONE;
    this.failures.clear();
  }

  public onCancelEdit(): void {
    this.drawer = Drawer.INFO;
    this.failures.clear();
  }

  public onDelete(event: Event): void {
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
      accept: () => this.call(
        () => this.service.delete(this.selected.number),
        () => {
          this.load(this.data.page);
        }
      )
    });
  }

  public onSave(data: any): void {
    if (this.drawer === Drawer.CREATION) {
      this.onCreate(data);
    } else {
      this.onUpdate(data);
    }
  }

  public onCreate(data: any): void {
    this.loading = true;
    this.service.create(data)
      .pipe(finalize(() => {
        this.loading = false;
        this.drawer = Drawer.NONE;
      }))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.drawer = Drawer.NONE;
          this.load(this.data.page);
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
        }
      });
  }

  public onUpdate(data: any): void {
    this.loading = true;
    this.service.update(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.drawer = Drawer.NONE;
          this.load(this.data.page);
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
        }
      });
  }

  public onSort(sorting: { field: string; order: number }): void {
    const direction = sorting.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));
    this.load(this.data.page);
  }

  // DRAWER

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.drawer = Drawer.NONE;
    }
  }

  // DATA LOADING

  public load(page: number | undefined = undefined): void {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  // PRIVATE METHODS

  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.drawer = Drawer.NONE;
          onSuccess();
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

enum Drawer {
  NONE = 'none',
  INFO = 'info',
  CREATION = 'creation',
  EDITION = 'edition'
}