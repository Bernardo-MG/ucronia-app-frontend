import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Key } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { finalize, Observable } from 'rxjs';
import { KeyForm } from '../key-form/key-form';
import { KeyList } from '../key-list/key-list';
import { KeyService } from '../key-service';

@Component({
  selector: 'assoc-key-view',
  imports: [ButtonModule, KeyList, KeyForm],
  templateUrl: './key-view.html'
})
export class KeyView implements OnInit {

  private readonly keyService = inject(KeyService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;

  public selectedData = new Key();
  public keys = new Page<Key>();

  public loading = false;

  public failures = new FailureStore();

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.directory.memberProfile.create),
      edit: authService.hasPermission(UcroniaPermissions.directory.memberProfile.update),
      delete: authService.hasPermission(UcroniaPermissions.directory.memberProfile.delete)
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

  public load(page: number | undefined = undefined): void {
    this.loading = true;

    this.keyService.getAll(page)
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
