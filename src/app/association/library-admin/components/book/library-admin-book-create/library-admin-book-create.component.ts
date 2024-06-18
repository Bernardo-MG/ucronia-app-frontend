import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonorAdminService } from '@app/association/library-admin/services/donor-admin.service';
import { Author } from '@app/association/library/models/author';
import { Book } from '@app/association/library/models/book';
import { BookType } from '@app/association/library/models/book-type';
import { Donor } from '@app/association/library/models/donor';
import { GameSystem } from '@app/association/library/models/game-system';
import { Publisher } from '@app/association/library/models/publisher';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { AuthorAdminService } from '../../../services/author-admin.service';
import { BookAdminService } from '../../../services/book-admin.service';
import { BookTypeAdminService } from '../../../services/book-type-admin.service';
import { GameSystemAdminService } from '../../../services/game-system-admin.service';
import { PublisherAdminService } from '../../../services/publisher-admin.service';
import { LibraryAdminBookFormComponent } from '../library-admin-book-form/library-admin-book-form.component';

@Component({
  selector: 'assoc-library-admin-book-create',
  standalone: true,
  imports: [CommonModule, LibraryAdminBookFormComponent, ArticleComponent],
  templateUrl: './library-admin-book-create.component.html'
})
export class LibraryAdminBookCreateComponent extends CreateComponent<Book> implements OnInit {

  public createPermission = false;

  public readingBookTypes = false;

  public readingGameSystems = false;

  public readingAuthors = false;

  public readingPublishers = false;

  public readingDonors = false;

  public bookTypePage = new PaginatedResponse<BookType[]>([]);

  public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  public authorPage = new PaginatedResponse<Author[]>([]);

  public publisherPage = new PaginatedResponse<Publisher[]>([]);

  public donorPage = new PaginatedResponse<Donor[]>([]);

  public bookType = '';

  public gameSystem = '';

  public authors: string[] = [];

  public publisher = '';

  public donors: number[] = [];

  constructor(
    private service: BookAdminService,
    private bookTypeService: BookTypeAdminService,
    private gameSystemService: GameSystemAdminService,
    private authorService: AuthorAdminService,
    private publisherService: PublisherAdminService,
    private donorService: DonorAdminService,
    private authContainer: AuthContainer,
    rt: Router
  ) {
    super(rt);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");

    // Load initial data
    this.onGoToBookTypePage(0);
    this.onGoToGameSystemPage(0);
    this.onGoToAuthorPage(0);
    this.onGoToPublisherPage(0);
    this.onGoToDonorPage(0);
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
    this.bookType = bookType;
  }

  public onSelectGameSystem(gameSystem: string) {
    this.gameSystem = gameSystem;
  }

  public onSelectAuthor(authors: string[]) {
    this.authors = authors;
  }

  public onSelectPublisher(publisher: string) {
    this.publisher = publisher;
  }

  public onSelectDonor(donors: number[]) {
    this.donors = donors;
  }

  protected override save(toSave: Book): Observable<Book> {
    toSave.publisher = new Publisher();
    toSave.publisher.name = this.publisher;
    toSave.bookType = new BookType();
    toSave.bookType.name = this.bookType;
    toSave.gameSystem = new GameSystem();
    toSave.gameSystem.name = this.gameSystem;
    toSave.donors = this.donors.map(d => {
      const donor = new Donor();
      donor.number = d;
      return donor;
    });
    toSave.authors = this.authors.map(a => {
      const author = new Author();
      author.name = a;
      return author;
    });
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Book): string {
    return '/library/admin';
  }

}
