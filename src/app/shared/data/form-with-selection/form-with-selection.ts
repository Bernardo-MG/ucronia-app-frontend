
import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { FormStatus } from '@bernardo-mg/form';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EMPTY, Observable } from 'rxjs';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'shared-form-with-selection',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, TableModule, SelectionList],
  templateUrl: './form-with-selection.html'
})
export class FormWithSelection {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<NameNumber>>>((page: number) => EMPTY);

  public readonly save = output<NameNumber>();

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

}
