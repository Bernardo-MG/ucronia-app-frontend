import { CommonModule, } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibraryAdminAuthorSelectionComponent } from '@app/association-admin/library-admin/components/author/library-admin-author-selection/library-admin-author-selection.component';
import { LibraryAdminBookTypeSelectionComponent } from '@app/association-admin/library-admin/components/book-type/library-admin-book-type-selection/library-admin-book-type-selection.component';
import { LibraryAdminGameSystemSelectionComponent } from '@app/association-admin/library-admin/components/game-system/library-admin-game-system-selection/library-admin-game-system-selection.component';
import { LibraryAdminPublisherSelectionComponent } from '@app/association-admin/library-admin/components/publisher/library-admin-publisher-selection/library-admin-publisher-selection.component';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Author } from '@app/models/library/author';
import { Book } from '@app/models/library/book';
import { BookType } from '@app/models/library/book-type';
import { GameSystem } from '@app/models/library/game-system';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'assoc-library-admin-book-update-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, ModalComponent, LibraryAdminGameSystemSelectionComponent, LibraryAdminBookTypeSelectionComponent, LibraryAdminPublisherSelectionComponent, LibraryAdminAuthorSelectionComponent, SaveControlsComponent, JustifyCenterDirective],
  templateUrl: './library-admin-book-update-form.component.html'
})
export class LibraryAdminBookUpdateFormComponent extends FormComponent<Book> {

  @Input() public bookTypePage = new PaginatedResponse<BookType[]>([]);

  @Input() public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  @Input() public authorPage = new PaginatedResponse<Author[]>([]);

  @Input() public publisherPage = new PaginatedResponse<Publisher[]>([]);

  @Input() public languages: Language[] = [];

  @Output() public goToBookTypePage = new EventEmitter<number>();

  @Output() public goToGameSystemPage = new EventEmitter<number>();

  @Output() public goToAuthorPage = new EventEmitter<number>();

  @Output() public goToPublisherPage = new EventEmitter<number>();

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

  public selector = '';

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
      donors: [[]],
      bookType: [],
      publishers: [[]],
      gameSystem: []
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

  public onSelectBookType(bookType: BookType) {
    this.bookType = bookType;
    this.selector = ''
    this.closeModal('book_type');
  }

  public onSelectGameSystem(gameSystem: GameSystem) {
    this.gameSystem = gameSystem;
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

  public onRemoveAuthor(author: Author) {
    this.authors = this.authors.filter(a => a.name !== author.name);
  }

  public onRemovePublisher(publisher: Publisher) {
    this.publishers = this.publishers.filter(d => d.name !== publisher.name);
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
