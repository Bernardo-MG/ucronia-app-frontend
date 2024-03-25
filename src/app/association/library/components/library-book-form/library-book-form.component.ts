import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Book } from '../../models/book';

@Component({
  selector: 'assoc-library-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LayoutModule, IconsModule],
  templateUrl: './library-book-form.component.html'
})
export class LibraryBookFormComponent extends FormComponent<Book> {

  @Input() public bookType = '';

  @Input() public gameSystem = '';

  @Input() public publisher = '';

  @Input() public authors: string[] = [];

  @Output() public showBookTypeSelection = new EventEmitter<void>();

  @Output() public showGameSystemSelection = new EventEmitter<void>();

  @Output() public showAuthorSelection = new EventEmitter<void>();

  @Output() public showPublisherSelection = new EventEmitter<void>();

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      isbn: [''],
      title: ['', Validators.required],
      language: ['']
    });
  }

  public onShowBookTypeSelection() {
    this.showBookTypeSelection.emit();
  }

  public onShowGameSystemSelection() {
    this.showGameSystemSelection.emit();
  }

  public onShowAuthorSelection() {
    this.showAuthorSelection.emit();
  }

  public onShowPublisherSelection() {
    this.showPublisherSelection.emit();
  }

}
