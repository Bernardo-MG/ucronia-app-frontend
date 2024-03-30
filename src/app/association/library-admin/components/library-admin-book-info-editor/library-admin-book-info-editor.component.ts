import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { EditionWrapperComponent } from '@app/shared/layout/components/edition-wrapper/edition-wrapper.component';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';
import { GameSystem } from '../../models/game-system';
import { Publisher } from '../../models/publisher';
import { AuthorAdminService } from '../../services/author-admin.service';
import { BookAdminService } from '../../services/book-admin.service';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminBookFormComponent } from '../library-admin-book-form/library-admin-book-form.component';
import { LibraryAdminBookInfoComponent } from '../library-admin-book-info/library-admin-book-info.component';

@Component({
  selector: 'assoc-library-admin-book-info-editor',
  standalone: true,
  imports: [CommonModule, ArticleComponent, EditionWrapperComponent, LibraryAdminBookFormComponent, LibraryAdminBookInfoComponent],
  templateUrl: './library-admin-book-info-editor.component.html'
})
export class LibraryAdminBookInfoEditorComponent extends InfoEditorComponent<Book> implements OnInit {

  private index = -1;

  public createPermission = false;

  public readingBookTypes = false;

  public readingGameSystems = false;

  public readingAuthors = false;

  public readingPublishers = false;

  public bookTypePage = new PaginatedResponse<BookType[]>([]);

  public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  public authorPage = new PaginatedResponse<Author[]>([]);

  public publisherPage = new PaginatedResponse<Publisher[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookAdminService,
    private bookTypeService: BookTypeAdminService,
    private gameSystemService: GameSystemAdminService,
    private authorService: AuthorAdminService,
    private publisherService: PublisherAdminService,
    private authContainer: AuthContainer
  ) {
    super(new Book());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("library_book", "update");
    this.deletable = this.authContainer.hasPermission("library_book", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam) {
        this.index = Number(indexParam);
      }
      this.load();
    });

    // Load initial data
    this.onGoToBookTypePage(0);
    this.onGoToGameSystemPage(0);
    this.onGoToAuthorPage(0);
    this.onGoToPublisherPage(0);
  }

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate(['/library']);
    });
  }

  protected override read(): Observable<Book> {
    return this.service.getOne(this.index);
  }

  protected override save(toSave: Book): Observable<Book> {
    toSave.publisher = this.data.publisher;
    toSave.bookType = this.data.bookType;
    toSave.gameSystem = this.data.gameSystem;
    toSave.authors = this.data.authors;
    return this.service.update(this.data.number, toSave);
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

  public onSelectBookType(bookType: string) {
    this.data.bookType = new BookType();
    this.data.bookType.name = bookType;
  }

  public onSelectGameSystem(gameSystem: string) {
    this.data.gameSystem = new GameSystem();
    this.data.gameSystem.name = gameSystem;
  }

  public onSelectAuthor(authors: string[]) {
    this.data.authors = authors.map(a => {
      const author = new Author();
      author.name = a;
      return author;
    });
  }

  public onSelectPublisher(publisher: string) {
    this.data.publisher = new Publisher();
    this.data.publisher.name = publisher;
  }

}
