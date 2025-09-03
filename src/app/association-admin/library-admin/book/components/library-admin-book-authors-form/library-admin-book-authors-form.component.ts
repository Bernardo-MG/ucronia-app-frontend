
import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminListSelection } from '@app/association-admin/library-admin/common/library-admin-list-selection/library-admin-list-selection';
import { Author } from '@app/domain/library/author';
import { Donor } from '@app/domain/library/donor';
import { Person } from '@app/domain/person/person';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-admin-book-authors-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, MessageModule, SaveControlsComponent, IconAddComponent, IconDeleteComponent, LibraryAdminListSelection],
  templateUrl: './library-admin-book-authors-form.component.html'
})
export class LibraryAdminAuthorsFormComponent extends FormComponent<Author[]> {

  public readonly selection = input(new PaginatedResponse<Author>());

  public readonly goToSelectionPage = output<number>();

  @Input() public override set data(value: Author[]) {
    if (value) {
      this.loadData(value);
    }
  }

  public get rows(): Donor[] {
    return this.form.get('authors').value;
  }

  public selecting = false;

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      authors: [[], Validators.required]
    });
  }

  public onStartSelecting() {
    this.selecting = true;
  }

  public onSelect(selected: Author) {
    if (!this.rows.find(d => d.number === selected.number)) {
      this.form.get('authors').setValue([...this.rows, selected]);
    }
    this.selecting = false;
  }

  public onRemove(donor: Donor) {
    const filteredRows = this.rows.filter(d => d.number !== donor.number);
    this.form.get('authors').setValue(filteredRows);
  }

  public nameRenderer(row: Author) {
    return row.name;
  }
  
  public override onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.get('authors').value);
    }
  }

}
