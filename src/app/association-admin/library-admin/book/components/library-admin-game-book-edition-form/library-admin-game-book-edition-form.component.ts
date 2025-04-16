import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminAuthorSelectionComponent } from '@app/association-admin/library-admin/author/components/library-admin-author-selection/library-admin-author-selection.component';
import { LibraryAdminBookTypeSelectionComponent } from '@app/association-admin/library-admin/book-type/components/library-admin-book-type-selection/library-admin-book-type-selection.component';
import { LibraryAdminGameSystemSelectionComponent } from '@app/association-admin/library-admin/game-system/components/library-admin-game-system-selection/library-admin-game-system-selection.component';
import { LibraryAdminPublisherSelectionComponent } from '@app/association-admin/library-admin/publisher/components/library-admin-publisher-selection/library-admin-publisher-selection.component';
import { Author } from '@app/models/library/author';
import { BookType } from '@app/models/library/book-type';
import { GameBook } from '@app/models/library/game-book';
import { GameSystem } from '@app/models/library/game-system';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent, IconSearchComponent } from '@bernardo-mg/icons';
import { JustifyCenterDirective } from '@bernardo-mg/layout';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-library-admin-game-book-edition-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LibraryAdminGameSystemSelectionComponent, LibraryAdminBookTypeSelectionComponent, LibraryAdminPublisherSelectionComponent, LibraryAdminAuthorSelectionComponent, SaveControlsComponent, IconSearchComponent, IconAddComponent, IconDeleteComponent, InputFailureFeedbackComponent, InvalidFieldDirective, JustifyCenterDirective],
  templateUrl: './library-admin-game-book-edition-form.component.html'
})
export class LibraryAdminGameBookEditionFormComponent extends FormComponent<GameBook> {

  @Input() public bookTypesSelection = new PaginatedResponse<BookType>();

  @Input() public gameSystemsSelection = new PaginatedResponse<GameSystem>();

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

  public get bookType(): BookType | undefined {
    return this.form.get('bookType').value;
  }

  public set bookType(data: BookType | undefined) {
    this.form.get('bookType').setValue(data);
  }

  public get gameSystem(): GameSystem | undefined {
    return this.form.get('gameSystem').value;
  }

  public set gameSystem(data: GameSystem | undefined) {
    this.form.get('gameSystem').setValue(data);
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

  public onShowBookTypeSelection() {
    this.view = 'book_type';
  }

  public onShowGameSystemSelection() {
    this.view = 'game_system';
  }

  public onShowAuthorSelection() {
    this.view = 'author';
  }

  public onShowPublisherSelection() {
    this.view = 'publisher';
  }

  public onSelectBookType(bookType: BookType) {
    this.bookType = bookType;
    this.view = 'form';
  }

  public onSelectGameSystem(gameSystem: GameSystem) {
    this.gameSystem = gameSystem;
    this.view = 'form';
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
