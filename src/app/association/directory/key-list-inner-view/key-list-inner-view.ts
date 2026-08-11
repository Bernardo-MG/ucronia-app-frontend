import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { Key } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable } from 'rxjs';
import { KeyForm } from '../key-form/key-form';
import { KeyList } from '../key-list/key-list';
import { KeyService } from '../key-service';

@Component({
  selector: 'assoc-key-list-inner-view',
  imports: [PanelModule, ButtonModule, DrawerModule, KeyList, KeyForm],
  templateUrl: './key-list-inner-view.html'
})
export class KeyListInnerView implements OnInit {

  private readonly keyService = inject(KeyService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;

  public selectedData = new Key();
  public keys: Key[] = [];

  public loading = false;

  public failures = new FailureStore();

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    this.permissions = {
      create: authService.hasPermission('MEMBER_PROFILE', 'CREATE'),
      edit: authService.hasPermission('MEMBER_PROFILE', 'UPDATE'),
      delete: authService.hasPermission('MEMBER_PROFILE', 'DELETE')
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  public onShowEdit(key: Key) {
    this.selectedData = key;
    this.dialog = Dialog.EDIT;
  }

  public onCreate(toCreate: Key): void {
    this.call(
      () => this.keyService.create(toCreate),
      () => this.load()
    );
  }

  public onUpdate(toUpdate: Key): void {
    this.call(
      () => this.keyService.update(toUpdate),
      () => this.load()
    );
  }

  public onDelete(number: number): void {
    this.call(
      () => this.keyService.delete(number),
      () => this.load()
    );
  }

  public load(): void {
    this.loading = true;

    this.keyService.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.keys = response);
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  private call(
    action: () => Observable<any>,
    onSuccess: () => void = () => { }
  ) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
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

enum Dialog {
  NONE = 'none',
  EDIT = 'edit',
  CREATE = 'create'
}
