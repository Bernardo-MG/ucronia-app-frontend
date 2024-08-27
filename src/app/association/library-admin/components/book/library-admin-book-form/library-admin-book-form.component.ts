import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Author } from '@app/association/library/models/author';
import { Book } from '@app/association/library/models/book';
import { BookType } from '@app/association/library/models/book-type';
import { GameSystem } from '@app/association/library/models/game-system';
import { Language } from '@app/association/library/models/language';
import { Person } from '@app/association/library/models/person';
import { Publisher } from '@app/association/library/models/publisher';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import * as bootstrap from 'bootstrap';
import { LibraryAdminAuthorSelectionComponent } from '../../author/library-admin-author-selection/library-admin-author-selection.component';
import { LibraryAdminBookTypeSelectionComponent } from '../../book-type/library-admin-book-type-selection/library-admin-book-type-selection.component';
import { LibraryAdminDonorSelectionComponent } from '../../donor/library-admin-donor-selection/library-admin-donor-selection.component';
import { LibraryAdminGameSystemSelectionComponent } from '../../game-system/library-admin-game-system-selection/library-admin-game-system-selection.component';
import { LibraryAdminPublisherSelectionComponent } from '../../publisher/library-admin-publisher-selection/library-admin-publisher-selection.component';

@Component({
  selector: 'assoc-library-admin-book-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, WaitingButtonComponent, LibraryAdminGameSystemSelectionComponent, LibraryAdminBookTypeSelectionComponent, LibraryAdminPublisherSelectionComponent, LibraryAdminAuthorSelectionComponent, LibraryAdminDonorSelectionComponent, ModalComponent, SaveControlsComponent, JustifyCenterDirective],
  templateUrl: './library-admin-book-form.component.html'
})
export class LibraryAdminBookFormComponent extends FormComponent<Book> {

  @Input() public bookTypePage = new PaginatedResponse<BookType[]>([]);

  @Input() public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  @Input() public authorPage = new PaginatedResponse<Author[]>([]);

  @Input() public publisherPage = new PaginatedResponse<Publisher[]>([]);

  @Input() public donorPage = new PaginatedResponse<Person[]>([]);

  @Input() public override set data(value: Book) {
    this.loadData(value);
    this.bookType = value.bookType.name;
    this.gameSystem = value.gameSystem.name;
  }

  @Input() public languages: Language[] = [];

  @Output() public goToBookTypePage = new EventEmitter<number>();

  @Output() public goToGameSystemPage = new EventEmitter<number>();

  @Output() public goToAuthorPage = new EventEmitter<number>();

  @Output() public goToPublisherPage = new EventEmitter<number>();

  @Output() public goToDonorPage = new EventEmitter<number>();

  public get authors(): Author[] {
    return this.form.get('authors')?.value;
  }

  public set authors(data: Author[]) {
    this.form.get('authors')?.setValue(data);
  }

  public get publishers(): Author[] {
    return this.form.get('publishers')?.value;
  }

  public set publishers(data: Author[]) {
    this.form.get('publishers')?.setValue(data);
  }

  public get donors(): Person[] {
    return this.form.get('donors')?.value;
  }

  public set donors(data: Person[]) {
    this.form.get('donors')?.setValue(data);
  }

  public get bookType(): string {
    return this.form.get('bookType')?.value;
  }

  public set bookType(data: string) {
    this.form.get('bookType')?.setValue(data);
  }

  public get gameSystem(): string {
    return this.form.get('gameSystem')?.value;
  }

  public set gameSystem(data: string) {
    this.form.get('gameSystem')?.setValue(data);
  }

  public selector = '';

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      number: [-1],
      index: [-1],
      isbn: ['', isbnValidator()],
      title: ['', Validators.required],
      language: ['', Validators.required],
      authors: [[]],
      donors: [[]],
      bookType: [''],
      publishers: [[]],
      gameSystem: ['']
    });
  }

  public onShowBookTypeSelection() {
    this.openModal('book_type');
  }

  public onShowGameSystemSelection() {
    this.openModal('game_system');
  }

  public onShowAuthorSelection() {
    this.openModal('author');
  }

  public onShowPublisherSelection() {
    this.openModal('publisher');
  }

  public onShowDonorSelection() {
    this.openModal('donor');
  }

  public onSelectBookType(bookType: BookType) {
    this.bookType = bookType.name;
    this.selector = ''
    this.closeModal('book_type');
  }

  public onSelectGameSystem(gameSystem: GameSystem) {
    this.gameSystem = gameSystem.name;
    this.selector = '';
    this.closeModal('game_system');
  }

  public onSelectAuthor(author: Author) {
    if (!this.authors.find(a => a.name === author.name)) {
      this.authors = this.authors.concat([author]);
    }
    this.selector = '';
    this.closeModal('author');
  }

  public onSelectPublisher(publisher: Publisher) {
    if (!this.publishers.find(p => p.name === publisher.name)) {
      this.publishers = this.publishers.concat([publisher]);
    }
    this.selector = '';
    this.closeModal('publisher');
  }

  public onSelectDonor(donor: Person) {
    if (!this.donors.find(d => d.number === donor.number)) {
      this.donors.push(donor);
    }
    this.selector = '';
    this.closeModal('donor');
  }

  public onRemoveAuthor(author: Author) {
    this.authors = this.authors.filter(a => a.name !== author.name);
  }

  public onRemoveDonor(donor: Person) {
    this.donors = this.donors.filter(d => d.number !== donor.number);
  }

  public onRemovePublisher(publisher: Publisher) {
    this.publishers = this.publishers.filter(d => d.name !== publisher.name);
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

  private openModal(modalId: string): void {
    const modalElement = document.getElementById(`${modalId}Modal`);
    if (modalElement) {
      let modal = bootstrap.Modal.getInstance(modalElement);
      if (!modal) {
        modal = new bootstrap.Modal(modalElement);
      }
      modal.show();
    }
  }

  private closeModal(modalId: string): void {
    const modalElement = document.getElementById(`${modalId}Modal`);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.toggle();
      }
    }
  }

}
