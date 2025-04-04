import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Author } from '@app/models/library/author';
import { FictionBook } from '@app/models/library/fiction-book';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { Person } from '@app/models/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { PaginatedResponse } from '@bernardo-mg/request';
import { Observable } from 'rxjs';
import { LibraryAdminFictionBookDetailsComponent } from '../../components/library-admin-fiction-book-details/library-admin-fiction-book-details.component';
import { LibraryAdminFictionBookDonorsFormComponent } from '../../components/library-admin-fiction-book-donors-form/library-admin-fiction-book-donors-form.component';
import { LibraryAdminFictionBookEditionFormComponent } from '../../components/library-admin-fiction-book-edition-form/library-admin-fiction-book-edition-form.component';
import { FictionBookAdminService } from '../../services/fiction-book-admin.service';

@Component({
  selector: 'assoc-library-admin-fiction-book-edition',
  imports: [CommonModule, RouterModule, LibraryAdminFictionBookEditionFormComponent, LibraryAdminFictionBookDonorsFormComponent, LibraryAdminFictionBookDetailsComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-fiction-book-edition.container.html'
})
export class LibraryAdminFictionBookEditionContainer extends InfoEditorStatusComponent<FictionBook> {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private service = inject(FictionBookAdminService);

  private authContainer = inject(AuthContainer);

  private index = -1;

  // TODO: these flags are not being used
  public readingBookTypes = false;

  public readingGameSystems = false;

  public readingAuthors = false;

  public readingPublishers = false;

  public readingDonors = false;

  public authorsSelection = new PaginatedResponse<Author>();

  public publishersSelection = new PaginatedResponse<Publisher>();

  public donorPage = new PaginatedResponse<Person>();

  public languages: Language[] = [];

  public readonly lendPermission;

  public get lendDisabled() {
    return this.waiting || !this.lendPermission;
  }

  public view: string = '';

  constructor() {
    super(new FictionBook());
    // Check permissions
    this.editable = this.authContainer.hasPermission("library_book", "update");
    this.deletable = this.authContainer.hasPermission("library_book", "delete");
    // Check permissions
    this.lendPermission = this.authContainer.hasPermission("library_lending", "update");

    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('number');
      if (indexParam) {
        this.index = Number(indexParam);
      }
      this.load();
    });

    // Load initial data
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

  protected override read(): Observable<FictionBook> {
    return this.service.getOne(this.index);
  }

  protected override save(toSave: FictionBook): Observable<FictionBook> {
    return this.service.update(this.data.number, toSave);
  }

}
