import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Profile, PublicMember, ScheduledGame } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { finalize, map, Observable, switchMap } from 'rxjs';
import { ScheduledGameForm } from '../scheduled-game-form/scheduled-game-form';
import { ScheduledGameInfo } from '../scheduled-game-info/scheduled-game-info';
import { ScheduledGameList } from '../scheduled-game-list/scheduled-game-list';
import { ScheduledGameService } from '../scheduled-game-service';

@Component({
  imports: [PanelModule, ButtonModule, DrawerModule, ScheduledGameList, ScheduledGameInfo, ScheduledGameForm],
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
  public members: PublicMember[] = [];
  private sort = new Sorting();
  public selectedData = new ScheduledGame();
  public selectedMaster = new Profile();

  public dialog = Dialog.NONE;

  public failures = new FailureStore();

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
      message: 'Estas seguro de querer borrar? Esta accion no es revertible',
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
          switchMap((loadedGame) => this.service.getMaster(loadedGame.master)
            .pipe(
              map((master) => ({
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

  private handleError(error: unknown): void {
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

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create'
}
