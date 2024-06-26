import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { LibraryAdminAuthorSelectionComponent } from '../../author/library-admin-author-selection/library-admin-author-selection.component';
import { LibraryAdminBookTypeSelectionComponent } from '../../book-type/library-admin-book-type-selection/library-admin-book-type-selection.component';
import { LibraryAdminDonorSelectionComponent } from '../../donor/library-admin-donor-selection/library-admin-donor-selection.component';
import { LibraryAdminGameSystemSelectionComponent } from '../../game-system/library-admin-game-system-selection/library-admin-game-system-selection.component';
import { LibraryAdminPublisherSelectionComponent } from '../../publisher/library-admin-publisher-selection/library-admin-publisher-selection.component';
import { Author } from '@app/association/library/models/author';
import { Book } from '@app/association/library/models/book';
import { BookType } from '@app/association/library/models/book-type';
import { Donor } from '@app/association/library/models/donor';
import { GameSystem } from '@app/association/library/models/game-system';
import { Language } from '@app/association/library/models/language';
import { Publisher } from '@app/association/library/models/publisher';

@Component({
  selector: 'assoc-library-admin-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule, WaitingButtonComponent, LibraryAdminGameSystemSelectionComponent, LibraryAdminBookTypeSelectionComponent, LibraryAdminPublisherSelectionComponent, LibraryAdminAuthorSelectionComponent, LibraryAdminDonorSelectionComponent],
  templateUrl: './library-admin-book-form.component.html'
})
export class LibraryAdminBookFormComponent extends FormComponent<Book> {

  @Input() public bookTypePage = new PaginatedResponse<BookType[]>([]);

  @Input() public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  @Input() public authorPage = new PaginatedResponse<Author[]>([]);

  @Input() public publisherPage = new PaginatedResponse<Publisher[]>([]);

  @Input() public donorPage = new PaginatedResponse<Donor[]>([]);

  @Input() public override set data(value: Book) {
    this.loadData(value);
    this.bookType = value.bookType.name;
    this.gameSystem = value.gameSystem.name;
    this.publisher = value.publisher.name;
    this.donors = value.donors.map(d => d.number);
    this.donorNames = value.donors.map(d => d.name.fullName);
    this.authors = value.authors.map(a => a.name);
  }

  @Output() public selectBookType = new EventEmitter<string>();

  @Output() public selectGameSystem = new EventEmitter<string>();

  @Output() public selectAuthor = new EventEmitter<string[]>();

  @Output() public selectPublisher = new EventEmitter<string>();

  @Output() public selectDonor = new EventEmitter<number[]>();

  @Output() public goToBookTypePage = new EventEmitter<number>();

  @Output() public goToGameSystemPage = new EventEmitter<number>();

  @Output() public goToAuthorPage = new EventEmitter<number>();

  @Output() public goToPublisherPage = new EventEmitter<number>();

  @Output() public goToDonorPage = new EventEmitter<number>();

  @ViewChild('pickCloseButton') pickCloseButton: any;

  public selector = '';

  public bookType = '';

  public gameSystem = '';

  public publisher = '';

  public donors: number[] = [];

  public donorNames: string[] = [];

  public authors: string[] = [];

  public languages: Language[] = [];

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      isbn: [''],
      title: ['', Validators.required],
      language: ['', Validators.required]
    });

    this.languages = [new Language('en', 'English'), new Language('es', 'Spanish')];
    this.languages = this.languages.sort((left, right) => (left.name > right.name ? -1 : 1));
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

  public onShowDonorSelection() {
    this.selector = 'donor';
  }

  public onSelectBookType(bookType: BookType) {
    this.bookType = bookType.name;
    this.selector = '';
    this.selectBookType.emit(this.bookType);
    this.pickCloseButton.nativeElement.click();
  }

  public onSelectGameSystem(gameSystem: GameSystem) {
    this.gameSystem = gameSystem.name;
    this.selector = '';
    this.selectGameSystem.emit(this.gameSystem);
    this.pickCloseButton.nativeElement.click();
  }

  public onSelectAuthor(author: Author) {
    if (!this.authors.find(a => a === author.name)) {
      this.authors.push(author.name);
      this.selector = '';
      this.selectAuthor.emit(this.authors);
    }
    this.pickCloseButton.nativeElement.click();
  }

  public onSelectPublisher(publisher: Publisher) {
    this.publisher = publisher.name;
    this.selector = '';
    this.selectPublisher.emit(this.publisher);
    this.pickCloseButton.nativeElement.click();
  }

  public onSelectDonor(donor: Donor) {
    if (!this.donors.find(d => d === donor.number)) {
      this.donors.push(donor.number);
      this.donorNames.push(donor.name.fullName);
      this.selector = '';
      this.selectDonor.emit(this.donors);
    }
    this.pickCloseButton.nativeElement.click();
  }

  public onRemoveAuthor(author: string) {
    this.authors = this.authors.filter(a => a !== author);
    this.selectAuthor.emit(this.authors);
  }

  public onRemoveDonor(donor: number) {
    this.donors = this.donors.filter(d => d !== donor);
    this.selectDonor.emit(this.donors);
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

  public onGoToDonorPage(page: number) {
    this.goToDonorPage.emit(page);
  }

}
