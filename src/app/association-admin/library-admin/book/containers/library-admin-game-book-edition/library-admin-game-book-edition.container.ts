import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Author } from '@app/models/library/author';
import { BookType } from '@app/models/library/book-type';
import { GameBook } from '@app/models/library/game-book';
import { GameSystem } from '@app/models/library/game-system';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { Person } from '@app/models/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { PaginatedResponse } from '@bernardo-mg/request';
import { Observable } from 'rxjs';
import { LibraryAdminGameBookDonorsFormComponent } from '../../../game-book/components/library-admin-game-book-donors-form/library-admin-game-book-donors-form.component';
import { GameBookAdminService } from '../../../game-book/services/game-book-admin.service';
import { LibraryAdminGameBookDetailsComponent } from '../../components/library-admin-game-book-details/library-admin-game-book-details.component';
import { LibraryAdminGameBookEditionFormComponent } from '../../components/library-admin-game-book-edition-form/library-admin-game-book-edition-form.component';

@Component({
  selector: 'assoc-library-admin-game-book-edition',
  imports: [CommonModule, RouterModule, LibraryAdminGameBookEditionFormComponent, LibraryAdminGameBookDonorsFormComponent, LibraryAdminGameBookDetailsComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-game-book-edition.container.html'
})
export class LibraryAdminGameBookEditionContainer extends InfoEditorStatusComponent<GameBook> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(GameBookAdminService);

  private index = -1;

  // TODO: these flags are not being used
  public readingBookTypes = false;

  public readingGameSystems = false;

  public readingAuthors = false;

  public readingPublishers = false;

  public readingDonors = false;

  public bookTypesSelection = new PaginatedResponse<BookType>();

  public gameSystemsSelection = new PaginatedResponse<GameSystem>();

  public authorsSelection = new PaginatedResponse<Author>();

  public publishersSelection = new PaginatedResponse<Publisher>();

  public donorPage = new PaginatedResponse<Person>();

  public languages: Language[] = [];

  public readonly lendPermission;

  public get lendDisabled() {
    return this.waiting || !this.lendPermission;
  }

  public view: string = '';

  constructor(
    authContainer: AuthContainer
  ) {
    super(new GameBook());
    // Check permissions
    this.editable = authContainer.hasPermission("library_book", "update");
    this.deletable = authContainer.hasPermission("library_book", "delete");
    // Check permissions
    this.lendPermission = authContainer.hasPermission("library_lending", "update");

    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('number');
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

    // Load languages
    this.languages = this.service.getLanguages();
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    super.onStartEditing();
  }

  public onGoToBookTypePage(page: number) {
    this.readingBookTypes = true;
    this.service.getBookTypes(page).subscribe({
      next: response => {
        this.bookTypesSelection = response;

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
    this.service.getGameSystems(page).subscribe({
      next: response => {
        this.gameSystemsSelection = response;

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
    this.service.getAuthors(page).subscribe({
      next: response => {
        this.authorsSelection = response;

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
    this.service.getPublishers(page).subscribe({
      next: response => {
        this.publishersSelection = response;

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
    this.service.getDonors(page).subscribe({
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

  protected override delete(): void {
    // TODO: shouldn't the delete return the observable, to keep consistency?
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<GameBook> {
    return this.service.getOne(this.index);
  }

  protected override save(toSave: GameBook): Observable<GameBook> {
    return this.service.update(this.data.number, toSave);
  }

}
