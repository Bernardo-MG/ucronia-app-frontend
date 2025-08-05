
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibraryBookLendingsComponent } from '@app/association/library/components/library-book-lendings/library-book-lendings.component';
import { Author } from '@app/models/library/author';
import { BookType } from '@app/models/library/book-type';
import { Donation } from '@app/models/library/donation';
import { GameBook } from '@app/models/library/game-book';
import { GameSystem } from '@app/models/library/game-system';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { Person } from '@app/models/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ControlButtonsComponent, InfoEditorStatusComponent } from '@bernardo-mg/form';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { LibraryAdminBookDonorsFormComponent } from '../../components/library-admin-book-donors-form/library-admin-book-donors-form.component';
import { LibraryAdminGameBookEditionFormComponent } from '../../components/library-admin-game-book-edition-form/library-admin-game-book-edition-form.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-game-book-edition',
  imports: [CardModule, RouterModule, SkeletonModule, LibraryAdminGameBookEditionFormComponent, LibraryAdminBookDonorsFormComponent, LibraryBookLendingsComponent, ControlButtonsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-game-book-edition.container.html'
})
export class LibraryAdminGameBookEditionContainer extends InfoEditorStatusComponent<GameBook> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(BookAdminService);

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

  public get authors(): string {
    return this.data.authors.map(e => e.name).join(", ");
  }

  public get publishers(): string {
    return this.data.publishers.map(e => e.name).join(", ");
  }

  public get language(): string {
    const language = this.languages.find(lang => lang.code === this.data.language);
    return language ? language.name : this.data.language;
  }

  public get donation(): Donation {
    if (!this.data.donation) {
      this.data.donation = new Donation();
    }

    return this.data.donation;
  }

  public readonly lendPermission;

  public get lendDisabled() {
    return this.waiting || !this.lendPermission;
  }

  public get donors(): string {
    let donors;
    const data = this.data;
    if (data.donation) {
      donors = data.donation.donors.map(e => e.name.fullName).join(", ");
    } else {
      donors = '';
    }

    return donors;
  }

  public view: string = '';

  constructor() {
    const authContainer = inject(AuthContainer);

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

  public onSetDonation(donation: Donation) {
    this.data.donation = donation;
    super.onSave(this.data);
  }

  protected override delete(): void {
    // TODO: shouldn't the delete return the observable, to keep consistency?
    this.service.deleteGameBook(this.data.number).subscribe(r => {
      this.router.navigate(['../..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<GameBook> {
    return this.service.getOneGameBook(this.index);
  }

  protected override save(toSave: GameBook): Observable<GameBook> {
    return this.service.updateGameBook(this.data.number, toSave);
  }

}
