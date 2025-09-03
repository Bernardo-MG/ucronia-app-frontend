
import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminListSelection } from '@app/association-admin/library-admin/common/library-admin-list-selection/library-admin-list-selection';
import { FormComponent } from '@bernardo-mg/form';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'assoc-library-admin-list-selection-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, TableModule, LibraryAdminListSelection],
  templateUrl: './library-admin-list-selection-form.html'
})
export class LibraryAdminListSelectionForm extends FormComponent<NameNumber[]> {

  public readonly selection = input(new PaginatedResponse<NameNumber>());

  public readonly goToSelectionPage = output<number>();

  @Input() public override set data(value: NameNumber[]) {
    if (value) {
      this.loadData(value);
      this.form.get('rows').setValue(value);
    }
  }

  public get rows(): NameNumber[] {
    return this.form.get('rows').value;
  }

  public selecting = false;

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      rows: [[], Validators.required]
    });
  }

  public onStartSelecting() {
    this.selecting = true;
  }

  public onSelect(selected: NameNumber) {
    if (!this.rows.find(r => r.number === selected.number)) {
      this.form.get('rows').setValue([...this.rows, selected]);
    }
    this.selecting = false;
  }

  public onRemove(row: NameNumber) {
    const filteredRows = this.rows.filter(r => r.number !== row.number);
    this.form.get('rows').setValue(filteredRows);
  }

  public nameRenderer(row: NameNumber) {
    return row.name;
  }
  
  public override onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.get('rows').value);
    }
  }

}
