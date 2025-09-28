
import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@app/core/form/form-status/form-status';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { EMPTY, Observable } from 'rxjs';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'shared-selection-list-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, TableModule, SelectionList],
  templateUrl: './form-with-list-selection.html'
})
export class FormWithListSelection {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<NameNumber>>>((page: number) => EMPTY);

  public readonly save = output<NameNumber[]>();

  public readonly formStatus;

  @Input() public set data(value: NameNumber[]) {
    if (value) {
      (this.form as any).get('rows').setValue(value);
    }
  }

  public get rows(): NameNumber[] {
    return (this.form as any).get('rows').value;
  }

  public selecting = false;

  public form;

  constructor() {
    const fb = inject(FormBuilder);


    this.form = fb.group({
      rows: [[], Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public onStartSelecting() {
    this.selecting = true;
  }

  public onSelect(selected: NameNumber) {
    if (!this.rows.find(r => r.number === selected.number)) {
      (this.form as any).get('rows').setValue([...this.rows, selected]);
    }
    this.selecting = false;
  }

  public onRemove(row: NameNumber) {
    const filteredRows = this.rows.filter(r => r.number !== row.number);
    (this.form as any).get('rows').setValue(filteredRows);
  }

  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit((this.form as any).get('rows').value as NameNumber[]);
    }
  }

}
