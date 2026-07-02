import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ScheduledGame } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable } from 'rxjs';
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
  private sort = new Sorting();
  public selectedData = new ScheduledGame();

  public dialog = Dialog.NONE;

  public failures = new FailureStore();

  constructor() {
    const authService = inject(AuthService);

    this.permissions = {
      create: authService.hasPermission('scheduled_game', 'create'),
      edit: authService.hasPermission('scheduled_game', 'update'),
      delete: authService.hasPermission('scheduled_game', 'delete')
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
    this.selectedData = scheduledGame;
    this.dialog = Dialog.INFO;
  }

  public load(page: number | undefined = undefined) {
    this.status.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(scheduledGames => this.scheduledGames = scheduledGames);
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
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
