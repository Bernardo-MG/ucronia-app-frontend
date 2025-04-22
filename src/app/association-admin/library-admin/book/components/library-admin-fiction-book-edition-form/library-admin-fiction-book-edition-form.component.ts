import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminAuthorSelectionComponent } from '@app/association-admin/library-admin/author/components/library-admin-author-selection/library-admin-author-selection.component';
import { LibraryAdminPublisherSelectionComponent } from '@app/association-admin/library-admin/publisher/components/library-admin-publisher-selection/library-admin-publisher-selection.component';
import { Author } from '@app/models/library/author';
import { FictionBook } from '@app/models/library/fiction-book';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-library-admin-fiction-book-edition-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LibraryAdminPublisherSelectionComponent, LibraryAdminAuthorSelectionComponent, SaveControlsComponent, IconAddComponent, IconDeleteComponent, InputFailureFeedbackComponent, InvalidFieldDirective, JustifyCenterDirective],
  templateUrl: './library-admin-fiction-book-edition-form.component.html'
})
export class LibraryAdminFictionBookEditionFormComponent extends FormComponent<FictionBook> {

  @Input() public authorsSelection = new PaginatedResponse<Author>();

  @Input() public publishersSelection = new PaginatedResponse<Publisher>();

  @Input() public languages: Language[] = [];

  @Output() public goToBookTypePage = new EventEmitter<number>();

  @Output() public goToGameSystemPage = new EventEmitter<number>();

  @Output() public goToAuthorPage = new EventEmitter<number>();

  @Output() public goToPublisherPage = new EventEmitter<number>();

  public view = 'form';

  public get authors(): Author[] {
    return this.form.get('authors')?.value;
  }

  public set authors(data: Author[]) {
    this.form.get('authors')?.setValue(data);
  }

  public get publishers(): Publisher[] {
    return this.form.get('publishers')?.value;
  }

  public set publishers(data: Publisher[]) {
    this.form.get('publishers')?.setValue(data);
  }

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      number: [undefined],
      index: [-1],
      isbn: ['', isbnValidator()],
      title: fb.group({
        supertitle: [''],
        title: ['', Validators.required],
        subtitle: ['']
      }),
      language: ['', Validators.required],
      publishDate: [''],
      authors: [[]],
      donation: fb.group({
        date: [''],
        donors: [[]]
      }),
      bookType: [],
      publishers: [[]],
      gameSystem: []
    });
  }

  public onShowAuthorSelection() {
    this.view = 'author';
  }

  public onShowPublisherSelection() {
    this.view = 'publisher';
  }

  public onSelectAuthor(author: Author) {
    if (!this.authors.find(a => a.name === author.name)) {
      this.authors = this.authors.concat([author]);
    }
    this.view = 'form';
  }

  public onSelectPublisher(publisher: Publisher) {
    if (!this.publishers.find(p => p.name === publisher.name)) {
      this.publishers = this.publishers.concat([publisher]);
    }
    this.view = 'form';
  }

  public onRemoveAuthor(author: Author) {
    this.authors = this.authors.filter(a => a.name !== author.name);
  }

  public onRemovePublisher(publisher: Publisher) {
    this.publishers = this.publishers.filter(d => d.name !== publisher.name);
  }

}
