import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Key, KeyAssignment } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';
import { MemberKeyForm } from '../member-key-form/member-key-form';
import { MemberKeyService } from '../member-key-service';

@Component({
  selector: 'assoc-member-key-info',
  imports: [DrawerModule, MessageModule, DrawerHeader, DrawerActions, DrawerFormActions, MemberKeyForm],
  templateUrl: './member-key-info.html'
})
export class MemberKeyInfo {

  private readonly service = inject(MemberKeyService);

  private readonly confirmationService = inject(ConfirmationService);

  private readonly destroyRef = inject(DestroyRef);

  public readonly permissions = {
    delete: inject(AuthService).hasPermission(UcroniaPermissions.key.delete),
    read: inject(AuthService).hasPermission(UcroniaPermissions.key.read),
    edit: inject(AuthService).hasPermission(UcroniaPermissions.key.update)
  };

  public readonly data = input.required<KeyAssignment>();
  public readonly close = output<void>();
  public readonly updated = output<void>();

  public editing = false;
  public saving = false;
  public error = '';
  public failures = new FailureStore();

  public onShowEdit(): void {
    if (!this.permissions.read || !this.permissions.edit || this.saving) {
      return;
    }
    this.failures.clear();
    this.error = '';
    this.editing = true;
  }

  public onCancelEdit(): void {
    if (this.saving) {
      return;
    }
    this.failures.clear();
    this.error = '';
    this.editing = false;
  }

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible && !this.saving) {
      this.close.emit();
    }
  }

  public onDelete(event: Event): void {
    if (!this.permissions.read || !this.permissions.delete || this.saving || this.editing) {
      return;
    }
    const number = this.data().number;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es reversible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        if (this.destroyRef.destroyed || this.saving || this.editing || this.data().number !== number) {
          return;
        }
        this.saving = true;
        this.error = '';
        this.service.delete(number)
          .pipe(
            finalize(() => (this.saving = false)),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe({
            next: () => {
              this.failures.clear();
              this.updated.emit();
              this.close.emit();
            },
            error: () => {
              this.error = 'No se pudo borrar la llave. Inténtalo de nuevo.';
            }
          });
      }
    });
  }

  public onUpdate(data: Key): void {
    if (!this.permissions.read || !this.permissions.edit || !this.editing || this.saving) {
      return;
    }
    this.saving = true;
    this.error = '';
    this.service.update({ ...data, number: this.data().number })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.saving = false))
      )
      .subscribe({
        next: () => {
          this.failures.clear();
          this.updated.emit();
          this.close.emit();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          this.error = 'No se pudo actualizar la llave. Revisa los datos e inténtalo de nuevo.';
        }
      });
  }

}
