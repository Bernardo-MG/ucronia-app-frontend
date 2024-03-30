import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { Book } from '../../models/book';
import { LibraryAuthorSelectionComponent } from '../library-author-selection/library-author-selection.component';
import { LibraryBookTypeSelectionComponent } from '../library-book-type-selection/library-book-type-selection.component';
import { LibraryGameSystemSelectionComponent } from '../library-game-system-selection/library-game-system-selection.component';
import { LibraryPublisherSelectionComponent } from '../library-publisher-selection/library-publisher-selection.component';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Author } from '../../models/author';
import { BookType } from '../../models/book-type';
import { GameSystem } from '../../models/game-system';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'assoc-library-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule, WaitingButtonComponent, LibraryGameSystemSelectionComponent, LibraryBookTypeSelectionComponent, LibraryPublisherSelectionComponent, LibraryAuthorSelectionComponent],
  templateUrl: './library-book-form.component.html'
})
export class LibraryBookFormComponent extends FormComponent<Book> {

  @Input() public bookTypePage = new PaginatedResponse<BookType[]>([]);

  @Input() public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  @Input() public authorPage = new PaginatedResponse<Author[]>([]);

  @Input() public publisherPage = new PaginatedResponse<Publisher[]>([]);
  
  @Input() public override set data(value: Book) {
    this.loadData(value);
    this.bookType = value.bookType.name;
    this.gameSystem = value.gameSystem.name;
    this.publisher = value.publisher.name;
    this.authors = value.authors.map(a => a.name);
  }

  @Output() public selectBookType = new EventEmitter<string>();

  @Output() public selectGameSystem = new EventEmitter<string>();

  @Output() public selectAuthor = new EventEmitter<string[]>();

  @Output() public selectPublisher = new EventEmitter<string>();

  @Output() public goToBookTypePage = new EventEmitter<number>();

  @Output() public goToGameSystemPage = new EventEmitter<number>();

  @Output() public goToAuthorPage = new EventEmitter<number>();

  @Output() public goToPublisherPage = new EventEmitter<number>();

  public selector = '';

  public bookType = '';

  public gameSystem = '';

  public publisher = '';

  public authors: string[] = [];

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
    this.selector = 'book_type';
  }

  public onShowGameSystemSelection() {
    this.selector = 'game_system';
  }

  public onShowAuthorSelection() {
    this.selector = 'author';
  }

  public onShowPublisherSelection() {
    this.selector = 'publisher';
  }

  public onCancelSelection() {
    this.selector = '';
  }

  public onSelectBookType(bookType: BookType) {
    this.bookType = bookType.name;
    this.selector = '';
    this.selectBookType.emit(this.bookType);
  }

  public onSelectGameSystem(gameSystem: GameSystem) {
    this.gameSystem = gameSystem.name;
    this.selector = '';
    this.selectGameSystem.emit(this.gameSystem);
  }

  public onSelectAuthor(author: Author) {
    this.authors.push(author.name);
    this.selector = '';
    this.selectAuthor.emit(this.authors);
  }

  public onSelectPublisher(publisher: Publisher) {
    this.publisher = publisher.name;
    this.selector = '';
    this.selectPublisher.emit(this.publisher);
  }

  public onGoToBookTypePage(page: number) {
    this.goToBookTypePage.emit(page);
  }

  public onGoToGameSystemPage(page: number) {
    this.goToGameSystemPage.emit(page);
  }

  public onGoToAuthorPage(page: number) {
    this.goToAuthorPage.emit(page);
  }

  public onGoToPublisherPage(page: number) {
    this.goToPublisherPage.emit(page);
  }

}
