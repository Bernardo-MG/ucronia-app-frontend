import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';
import { GameSystem } from '../../models/game-system';
import { Publisher } from '../../models/publisher';
import { AuthorService } from '../../services/author.service';
import { BookTypeService } from '../../services/book-type.service';
import { BookService } from '../../services/book.service';
import { GameSystemService } from '../../services/game-system.service';
import { PublisherService } from '../../services/publisher.service';
import { LibraryAuthorSelectionComponent } from '../library-author-selection/library-author-selection.component';
import { LibraryBookFormComponent } from '../library-book-form/library-book-form.component';
import { LibraryBookTypeSelectionComponent } from '../library-book-type-selection/library-book-type-selection.component';
import { LibraryGameSystemSelectionComponent } from '../library-game-system-selection/library-game-system-selection.component';
import { LibraryPublisherSelectionComponent } from '../library-publisher-selection/library-publisher-selection.component';

@Component({
  selector: 'assoc-library-book-create',
  standalone: true,
  imports: [CommonModule, LayoutModule, LibraryBookFormComponent, LibraryGameSystemSelectionComponent, LibraryBookTypeSelectionComponent, LibraryPublisherSelectionComponent, LibraryAuthorSelectionComponent],
  templateUrl: './library-book-create.component.html'
})
export class LibraryBookCreateComponent extends CreateComponent<Book> implements OnInit {

  public createPermission = false;

  public selectBookType = false;

  public selectGameSystem = false;

  public selectAuthor = false;

  public selectPublisher = false;

  public readingBookTypes = false;

  public readingGameSystems = false;

  public readingAuthors = false;

  public readingPublishers = false;

  public bookTypePage = new PaginatedResponse<BookType[]>([]);

  public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  public authorPage = new PaginatedResponse<Author[]>([]);

  public publisherPage = new PaginatedResponse<Publisher[]>([]);

  public bookType = '';

  public gameSystem = '';

  public author = '';

  public publisher = '';

  constructor(
    private service: BookService,
    private bookTypeService: BookTypeService,
    private gameSystemService: GameSystemService,
    private authorService: AuthorService,
    private publisherService: PublisherService,
    private authContainer: AuthContainer,
    rt: Router
  ) {
    super(rt);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");
    this.onGoToBookTypePage(0);
    this.onGoToGameSystemPage(0);
    this.onGoToAuthorPage(0);
    this.onGoToPublisherPage(0);
  }

  public onGoToBookTypePage(page: number) {
    this.readingBookTypes = true;
    // TODO: The page correction should be done automatically
    this.bookTypeService.getAll(page).subscribe({
      next: response => {
        this.bookTypePage = response;

        // Reactivate view
        this.readingBookTypes = false;
      },
      error: error => {
        // Reactivate view
        this.readingBookTypes = false;
      }
    });
  }

  public onGoToGameSystemPage(page: number) {
    this.readingGameSystems = true;
    // TODO: The page correction should be done automatically
    this.gameSystemService.getAll(page).subscribe({
      next: response => {
        this.gameSystemPage = response;

        // Reactivate view
        this.readingGameSystems = false;
      },
      error: error => {
        // Reactivate view
        this.readingGameSystems = false;
      }
    });
  }

  public onGoToAuthorPage(page: number) {
    this.readingAuthors = true;
    // TODO: The page correction should be done automatically
    this.authorService.getAll(page).subscribe({
      next: response => {
        this.authorPage = response;

        // Reactivate view
        this.readingAuthors = false;
      },
      error: error => {
        // Reactivate view
        this.readingAuthors = false;
      }
    });
  }

  public onGoToPublisherPage(page: number) {
    this.readingPublishers = true;
    // TODO: The page correction should be done automatically
    this.publisherService.getAll(page).subscribe({
      next: response => {
        this.publisherPage = response;

        // Reactivate view
        this.readingPublishers = false;
      },
      error: error => {
        // Reactivate view
        this.readingPublishers = false;
      }
    });
  }

  public onShowBookTypeSelection() {
    this.selectBookType = true;
  }

  public onShowGameSystemSelection() {
    this.selectGameSystem = true;
  }

  public onShowAuthorSelection() {
    this.selectAuthor = true;
  }

  public onShowPublisherSelection() {
    this.selectPublisher = true;
  }

  public onSelectBookType(bookType: BookType) {
    this.bookType = bookType.name;
    this.selectBookType = false;
  }

  public onSelectGameSystem(gameSystem: GameSystem) {
    this.gameSystem = gameSystem.name;
    this.selectGameSystem = false;
  }

  public onSelectAuthor(author: Author) {
    this.author = author.name;
    this.selectAuthor = false;
  }

  public onSelectPublisher(publisher: Publisher) {
    this.publisher = publisher.name;
    this.selectPublisher = false;
  }

  protected override save(toSave: Book): Observable<Book> {
    toSave.bookType = new BookType();
    toSave.bookType.name = this.bookType;
    toSave.gameSystem = new GameSystem();
    toSave.gameSystem.name = this.gameSystem;
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Book): string {
    return `/library/book/${saved.number}`;
  }

}
