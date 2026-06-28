
import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { Observable, of } from 'rxjs';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'shared-selection-list-form',
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule, ButtonModule, TableModule],
  templateUrl: './selection-list-form.html'
})
export class SelectionListForm {

  @Input() public set data(value: NameNumber[]) {
    if (value) {
      (this.form as any).get('rows').setValue(value);
    }
  }

  public readonly searchSelection = input<(query: string) => Observable<NameNumber[]>>((query: string) => of([]));
  public readonly searchPlaceholder = input('Buscar...');

  public readonly save = output<NameNumber[]>();

  public readonly formStatus;

  public searchValue: NameNumber | undefined;
  public searchResults: NameNumber[] = [];

  public get rows(): NameNumber[] {
    return (this.form as any).get('rows').value;
  }

  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      rows: [[], Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public onChoose(selected: NameNumber) {
    if (!this.rows.find(r => r.number === selected.number)) {
      this.form.get('rows')?.setValue([...this.rows, selected]);
      this.form.markAsDirty();
    }

    this.searchValue = undefined;
    this.searchResults = [];
  }

  public onSearch(event: { query: string }) {
    this.searchSelection()(event.query?.trim())
      .subscribe(response => this.searchResults = response);
  }

  public onRemove(row: NameNumber) {
    const filteredRows = this.rows.filter(r => r.number !== row.number);
    this.form.get('rows')?.setValue(filteredRows);
  }

  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.get('rows')?.value as NameNumber[]);
    }
  }

}
