import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Profile, ScheduledGame } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { finalize, map, Observable, switchMap } from 'rxjs';
import { CalendarStatus } from 'projects/ucronia/domain/src/lib/calendar/calendar-status';
import { ScheduledGameForm } from '../scheduled-game-form/scheduled-game-form';
import { ScheduledGameInfo } from '../scheduled-game-info/scheduled-game-info';
import { ScheduledGameList } from '../scheduled-game-list/scheduled-game-list';
import { ScheduledGameService } from '../scheduled-game-service';

@Component({
  imports: [FormsModule, ButtonModule, CardModule, DrawerModule, IconFieldModule, InputIconModule, InputTextModule,
    SelectButtonModule, ScheduledGameList, ScheduledGameInfo, ScheduledGameForm],
  templateUrl: './scheduled-game-view.html'
})
export class ScheduledGameView implements OnInit {

  private readonly service = inject(ScheduledGameService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;
  public readonly status: Status = {
    loading: false
  };

  public scheduledGames = new Page<ScheduledGame>();
  public filterValue = '';
  public selectedStatus: CalendarStatus | 'all' = 'all';
  public readonly statusOptions: StatusOption[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Borrador', value: CalendarStatus.DRAFT },
    { label: 'Publicada', value: CalendarStatus.PUBLISHED }
  ];

  public members: Profile[] = [];
  public selectedData = new ScheduledGame();
  public selectedMaster = new Profile();
  public dialog = Dialog.NONE;
  public failures = new FailureStore();

  private sort = new Sorting();

  public get filteredScheduledGames(): ScheduledGame[] {
    const query = this.filterValue.trim().toLocaleLowerCase('es');

    return this.scheduledGames.content.filter(game => {
      const matchesStatus = this.selectedStatus === 'all' || game.status === this.selectedStatus;
      const matchesQuery = !query
        || game.title.toLocaleLowerCase('es').includes(query)
        || game.location.toLocaleLowerCase('es').includes(query);

      return matchesStatus && matchesQuery;
    });
  }

  public get draftCount(): number {
    return this.scheduledGames.content.filter(game => game.status === CalendarStatus.DRAFT).length;
  }

  public get publishedCount(): number {
    return this.scheduledGames.content.filter(game => game.status === CalendarStatus.PUBLISHED).length;
  }

  constructor() {
    const authService = inject(AuthService);

    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.scheduledGame.create),
      edit: authService.hasPermission(UcroniaPermissions.scheduledGame.update),
      delete: authService.hasPermission(UcroniaPermissions.scheduledGame.delete)
    };
  }

  public ngOnInit(): void {
    this.load();
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

  public onUpdate(toUpdate: ScheduledGame): void {
    this.call(
      () => this.service.update(toUpdate),
      () => this.load()
    );
  }

  public onDelete(event: Event) {
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
      accept: () => this.call(
        () => this.service.delete(this.selectedData.number),
        () => this.load()
      )
    });
  }

  public onShowEdit() {
    this.dialog = Dialog.EDIT;
  }

  public onShowInfo(scheduledGame: ScheduledGame) {
    this.dialog = Dialog.INFO;

    this.withLoading(
      this.service.getOne(scheduledGame.number)
        .pipe(
          switchMap(loadedGame => this.service.getMaster(loadedGame.master)
            .pipe(
              map(master => ({
                loadedGame,
                master
              }))
            )
          )
        )
    )
      .subscribe(({ loadedGame, master }) => {
        this.selectedData = loadedGame;
        this.selectedMaster = master;
      });
  }

  public load(page: number | undefined = undefined) {
    this.withLoading(
      this.service.getAll(page, this.sort)
    )
      .subscribe(scheduledGames => this.scheduledGames = scheduledGames);
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  public onSearchMembers(event: { query: string }) {
    this.service.searchMembers(event.query?.trim())
      .subscribe(members => {
        this.members = members;
      });
  }

  public onPublish(event: Event): void {
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
      accept: () => this.call(
        () => this.service.publish(this.selectedData.number),
        () => this.load()
      )
    });
  }

  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.status.loading = true;

    action()
      .pipe(finalize(() => this.status.loading = false))
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