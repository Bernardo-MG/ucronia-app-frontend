import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorAdminService } from '@app/association/library-admin/services/donor-admin.service';
import { Author } from '@app/association/library/models/author';
import { Book } from '@app/association/library/models/book';
import { BookType } from '@app/association/library/models/book-type';
import { GameSystem } from '@app/association/library/models/game-system';
import { Person } from '@app/association/library/models/person';
import { Publisher } from '@app/association/library/models/publisher';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { AuthorAdminService } from '../../../services/author-admin.service';
import { BookAdminService } from '../../../services/book-admin.service';
import { BookTypeAdminService } from '../../../services/book-type-admin.service';
import { GameSystemAdminService } from '../../../services/game-system-admin.service';
import { PublisherAdminService } from '../../../services/publisher-admin.service';
import { LibraryAdminBookFormComponent } from '../library-admin-book-form/library-admin-book-form.component';
import { LibraryAdminBookInfoComponent } from '../library-admin-book-info/library-admin-book-info.component';

@Component({
  selector: 'assoc-library-admin-book-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, ArticleComponent, LibraryAdminBookFormComponent, LibraryAdminBookInfoComponent],
  templateUrl: './library-admin-book-info-editor.component.html'
})
export class LibraryAdminBookInfoEditorComponent extends InfoEditorStatusComponent<Book> implements OnInit {

  private index = -1;

  public readingBookTypes = false;

  public readingGameSystems = false;

  public readingAuthors = false;

  public readingPublishers = false;

  public readingDonors = false;

  public bookTypePage = new PaginatedResponse<BookType[]>([]);

  public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  public authorPage = new PaginatedResponse<Author[]>([]);

  public publisherPage = new PaginatedResponse<Publisher[]>([]);

  public donorPage = new PaginatedResponse<Person[]>([]);

  public relationships = new Book();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookAdminService,
    private bookTypeService: BookTypeAdminService,
    private gameSystemService: GameSystemAdminService,
    private authorService: AuthorAdminService,
    private publisherService: PublisherAdminService,
    private donorService: DonorAdminService,
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
    this.onGoToDonorPage(0);
  }

  protected override onLoad(data: Book): void {
    super.onLoad(data);
    this.relationships = data;
  }

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate(['/library/admin']);
    });
  }

  protected override read(): Observable<Book> {
    return this.service.getOne(this.index);
  }

  protected override save(toSave: Book): Observable<Book> {
    toSave.publisher = this.relationships.publisher;
    toSave.bookType = this.relationships.bookType;
    toSave.gameSystem = this.relationships.gameSystem;
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

  public onGoToDonorPage(page: number) {
    this.readingDonors = true;
    // TODO: The page correction should be done automatically
    this.donorService.getAll(page).subscribe({
      next: response => {
        this.donorPage = response;

        // Reactivate view
        this.readingDonors = false;
      },
      error: error => {
        // Reactivate view
        this.readingDonors = false;
      }
    });
  }

  public onSelectBookType(bookType: string) {
    this.relationships.bookType = new BookType();
    this.relationships.bookType.name = bookType;
  }

  public onSelectGameSystem(gameSystem: string) {
    this.relationships.gameSystem = new GameSystem();
    this.relationships.gameSystem.name = gameSystem;
  }

  public onSelectPublisher(publisher: string) {
    this.relationships.publisher = new Publisher();
    this.relationships.publisher.name = publisher;
  }

}
