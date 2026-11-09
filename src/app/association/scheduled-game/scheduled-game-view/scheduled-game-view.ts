import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DetailRequest } from '@app/shared/request/detail-request';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, SearchRequest, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { UcroniaPermissions } from '@ucronia/auth';
import { CalendarStatus, GameTable, Profile, ScheduledGame } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { SelectButtonModule } from 'primeng/selectbutton';
import { finalize, forkJoin, Observable, of, Subscription, switchMap } from 'rxjs';
import { ScheduledGameForm } from '../scheduled-game-form/scheduled-game-form';
import { ScheduledGameInfo } from '../scheduled-game-info/scheduled-game-info';
import { ScheduledGameList } from '../scheduled-game-list/scheduled-game-list';
import { ScheduledGameService } from '../scheduled-game-service';

@Component({
  imports: [TextFilter, DrawerHeader, DrawerFormActions, DrawerActions, FormsModule, ButtonModule, CardModule, DrawerModule, SelectButtonModule, ScheduledGameList, ScheduledGameInfo, ScheduledGameForm],
  templateUrl: './scheduled-game-view.html'
})
export class ScheduledGameView implements OnInit {

  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(ScheduledGameService);

  public readonly Dialog = Dialog;
  public get dialog(): Dialog {
    return this.currentDialog;
  }
  public set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.memberSearch.cancel();
      this.members = [];
      this.currentDialog = value;
    }
  }
  public get draftCount(): number {
    return this.scheduledGames.content.filter(game => game.status === CalendarStatus.DRAFT).length;
  }
  public failures = new FailureStore();
  public members: Profile[] = [];
  public readonly permissions: Permissions;
  public get publishedCount(): number {
    return this.scheduledGames.content.filter(game => game.status === CalendarStatus.PUBLISHED).length;
  }
  public scheduledGames = new Page<ScheduledGame>();
  public selectedData = new ScheduledGame();
  public selectedMaster = new Profile();
  public readonly selectedStatus: CalendarStatus | 'all' = 'all';
  public selectedTable: GameTable | undefined;
  public readonly status: Status = {
    loading: false
  };
  public readonly statusOptions: StatusOption[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Borrador', value: CalendarStatus.DRAFT },
    { label: 'Publicada', value: CalendarStatus.PUBLISHED }
  ];
  public tables: GameTable[] = [];

  private currentDialog = Dialog.NONE;
  private readonly detailRequest = new DetailRequest();
  private listRequest?: Subscription;
  private readonly memberSearch = new SearchRequest();
  private readonly sort = new Sorting();

  public constructor() {
    const authService = inject(AuthService);

    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.scheduledGame.create),
      edit: authService.hasPermission(UcroniaPermissions.scheduledGame.update),
      delete: authService.hasPermission(UcroniaPermissions.scheduledGame.delete)
    };
  }

  // Lifecycle hooks
  public ngOnInit(): void {
    this.load();
    this.loadTables();
  }

  // Event handlers
  public load(page: number | undefined = undefined) {
    this.listRequest?.unsubscribe();
    this.listRequest = this.withLoading(
      this.service.getAll(page, this.sort)
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(scheduledGames => this.scheduledGames = scheduledGames);
  }

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onChangeDirection(sorting: SortingEvent) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;

    this.sort.addField(new SortingProperty(sorting.field, direction));
    this.load(this.scheduledGames.page);
  }

  public onCreate(toCreate: ScheduledGame): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.load()
    );
  }

  public onDelete(event: Event) {
    const dialog = this.dialog;
    const number = this.selectedData.number;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es reversible',
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
        if (
          this.destroyRef.destroyed ||
          this.dialog !== dialog ||
          this.selectedData.number !== number
        ) {
          return;
        }

        this.call(
          () => this.service.delete(number),
          () => this.load()
        );
      }
    });
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.failures.clear();
      this.dialog = Dialog.NONE;
    }
  }

  public onPublish(event: Event): void {
    const dialog = this.dialog;
    const number = this.selectedData.number;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de que quieres publicar esta partida?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Publicar',
        severity: 'success'
      },
      accept: () => {
        if (
          this.destroyRef.destroyed ||
          this.dialog !== dialog ||
          this.selectedData.number !== number
        ) {
          return;
        }

        this.call(
          () => this.service.publish(number),
          () => this.load()
        );
      }
    });
  }

  public onSearchMembers(event: { query: string }): void {
    this.memberSearch.search(event.query, query => this.service.searchMembers(query))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(members => this.members = members);
  }

  public onShowEdit() {
    this.dialog = Dialog.EDIT;
  }

  public onShowInfo(scheduledGame: ScheduledGame) {
    this.detailRequest.cancel();
    this.dialog = Dialog.INFO;
    this.selectedTable = undefined;

    this.withLoading(
      this.service.getOne(scheduledGame.number)
        .pipe(
          switchMap(loadedGame => forkJoin({
            loadedGame: of(loadedGame),
            master: this.service.getMaster(loadedGame.master),
            table: !loadedGame.table
              ? of(undefined)
              : this.service.getTable(loadedGame.table)
          }))
        )
    )
      .pipe(this.detailRequest.untilCancelled())
      .subscribe(({ loadedGame, master, table }) => {
        this.selectedData = loadedGame;
        this.selectedMaster = master;
        this.selectedTable = table;
      });
  }

  public onUpdate(toUpdate: ScheduledGame): void {
    this.call(
      () => this.service.update(toUpdate),
      () => this.load()
    );
  }

  // Data loading
  private loadTables(): void {
    this.service.getTables()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(tables => this.tables = tables);
  }

  // Private methods
  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.status.loading = true;
    action()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.status.loading = false)
      )
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          onSuccess();
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: unknown) {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

  private withLoading<T>(
    observable: Observable<T>
  ): Observable<T> {
    this.status.loading = true;

    return observable.pipe(
      finalize(() => this.status.loading = false)
    );
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface Status {
  loading: boolean;
}

interface StatusOption {
  label: string;
  value: CalendarStatus | 'all';
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create'
}
