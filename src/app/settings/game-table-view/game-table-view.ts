import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { GameTable } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { finalize, Observable } from 'rxjs';
import { GameTableForm } from '../game-table-form/game-table-form';
import { GameTableList } from '../game-table-list/game-table-list';
import { GameTableService } from '../game-table-service';

@Component({
  selector: 'assoc-game-table-view', imports: [ButtonModule, GameTableForm, GameTableList],
  templateUrl: './game-table-view.html'
})
export class GameTableView implements OnInit {

  private readonly service = inject(GameTableService);

  public readonly Dialog = Dialog;
  public readonly permissions: Permissions;

  public data = new Page<GameTable>();
  public selectedData = new GameTable();
  public dialog = Dialog.NONE;
  public failures = new FailureStore();
  public loading = false;

  constructor() {
    const authService = inject(AuthService);
    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.gameTable.create),
      edit: authService.hasPermission(UcroniaPermissions.gameTable.update),
      delete: authService.hasPermission(UcroniaPermissions.gameTable.delete)
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  public onShowEdit(table: GameTable): void {
    this.selectedData = table; this.dialog = Dialog.EDIT;
  }

  public onCreate(table: GameTable): void {
    this.call(() => this.service.create(table), () => this.load());
  }

  public onUpdate(table: GameTable): void {
    this.call(() => this.service.update(table), () => this.load(this.data.page));
  }

  public onDelete(number: number): void {
    this.call(() => this.service.delete(number), () => this.load());
  }

  public load(page: number | undefined = undefined): void {
    this.loading = true;
    this.service.getAll(page).pipe(finalize(() => this.loading = false)).subscribe(data => this.data = data);
  }

  private call(action: () => Observable<unknown>, onSuccess: () => void): void {
    this.loading = true;
    action().pipe(finalize(() => this.loading = false)).subscribe({
      complete: () => { this.failures.clear(); this.dialog = Dialog.NONE; onSuccess(); },
      error: error => this.failures = error instanceof FailureResponse ? error.failures : new FailureStore()
    });
  }
}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

enum Dialog {
  NONE = 'none',
  EDIT = 'edit',
  CREATE = 'create'
}
