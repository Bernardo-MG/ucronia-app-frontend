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

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public selectedData = new ContactMethod();
  public contactMethodData = new Page<ContactMethod>();
  public contactMethodSelection: ContactMethod[] = [];

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public creating = false;

  public failures = new FailureStore();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("contact_method", "create");
    this.editable = authService.hasPermission("contact_method", "update");
    this.deletable = authService.hasPermission("contact_method", "delete");
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onShowEditContactMethod(contactMethod: ContactMethod) {
    this.selectedData = contactMethod;
    this.editing = true;
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
          this.creating = false;
          this.editing = false;

          onSuccess();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          return throwError(() => error);
        }
      });
  }

}