import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { ContactMethod } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
import { ContactMethodForm } from '../contact-method-form/contact-method-form';
import { ContactMethodList } from '../contact-method-list/contact-method-list';
import { ContactMethodService } from '../contact-method-service';

@Component({
  selector: 'assoc-contact-method-list-inner-view',
  imports: [PanelModule, ButtonModule, DialogModule, ContactMethodList, ContactMethodForm],
  templateUrl: './contact-method-list-inner-view.html'
})
export class ContactMethodListInnerView implements OnInit {

  private readonly contactMethodService = inject(ContactMethodService);

  public readonly permissions: Permissions;
  protected readonly Dialog = Dialog;

  public dialog = Dialog.NONE;

  public selectedData = new ContactMethod();
  public contactMethodData = new Page<ContactMethod>();
  public contactMethodSelection: ContactMethod[] = [];

  /**
   * Loading flag.
   */
  public loading = false;

  public failures = new FailureStore();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission("contact_method", "create"),
      edit: authService.hasPermission("contact_method", "update"),
      delete: authService.hasPermission("contact_method", "delete")
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onShowEditContactMethod(contactMethod: ContactMethod) {
    this.selectedData = contactMethod;
    this.dialog = Dialog.EDIT;
  }

  public onCreateContactMethod(toCreate: ContactMethod): void {
    this.mutation(
      this.contactMethodService.create(toCreate),
      () => this.load()
    );
  }

  public onUpdateContactMethod(toUpdate: ContactMethod): void {
    this.mutation(
      this.contactMethodService.update(toUpdate),
      () => this.load(this.contactMethodData.page)
    );
  }

  public onDeleteContactMethod(number: number): void {
    this.mutation(
      this.contactMethodService.delete(number),
      () => this.load()
    );
  }

  // DATA LOADING

  public load(page: number | undefined = undefined): void {
    this.loading = true;

    this.contactMethodService.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.contactMethodData = response);
  }

  // DIALOGS

  public onDialogVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  // PRIVATE METHODS

  private mutation(
    observable: Observable<any>,
    onSuccess: () => void = () => { }
  ) {
    this.loading = true;
    observable
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