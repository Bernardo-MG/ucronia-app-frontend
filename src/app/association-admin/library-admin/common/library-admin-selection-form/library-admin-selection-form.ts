
import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminListSelection } from '@app/association-admin/library-admin/common/library-admin-list-selection/library-admin-list-selection';
import { FormStatus } from '@app/core/form/form-status/form-status';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EMPTY, Observable } from 'rxjs';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'assoc-library-admin-selection-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, TableModule, LibraryAdminListSelection],
  templateUrl: './library-admin-selection-form.html'
})
export class LibraryAdminSelectionForm {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<NameNumber>>>((page: number) => EMPTY);

  public readonly save = output<NameNumber>();

  public readonly reject = output<void>();

  public readonly formStatus;

  public selecting = false;

  @Input() public set data(value: NameNumber) {
    this.form.patchValue(value as any);
  }

  public get name() {
    return this.form.value.name;
  }

  public form;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [undefined, Validators.required],
      name: ['', Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public onStartSelecting() {
    this.selecting = true;
  }

  public onSelect(selected: NameNumber) {
    this.form.patchValue(selected as any);
    this.selecting = false;
  }

  public onRemove() {
  }

  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit((this.form as any).value as NameNumber);
    }
  }

  public onCancel() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.reject.emit();
  }

}
