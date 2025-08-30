
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibraryBookLendingsComponent } from '@app/association/library/components/library-book-lendings/library-book-lendings.component';
import { Author } from '@app/domain/library/author';
import { Donation } from '@app/domain/library/donation';
import { Donor } from '@app/domain/library/donor';
import { FictionBook } from '@app/domain/library/fiction-book';
import { Language } from '@app/domain/library/language';
import { Publisher } from '@app/domain/library/publisher';
import { Person } from '@app/domain/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { LibraryAdminBookDonorsFormComponent } from '../../components/library-admin-book-donors-form/library-admin-book-donors-form.component';
import { LibraryAdminFictionBookEditionFormComponent } from '../../components/library-admin-fiction-book-edition-form/library-admin-fiction-book-edition-form.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-fiction-book-edition',
  imports: [CardModule, RouterModule, SkeletonModule, PanelModule, TableModule, ButtonModule, MenuModule, ConfirmPopupModule, ToastModule, LibraryAdminFictionBookEditionFormComponent, LibraryAdminBookDonorsFormComponent, LibraryBookLendingsComponent],
  templateUrl: './library-admin-fiction-book-edition.container.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminFictionBookEditionContainer extends InfoEditorStatusComponent<FictionBook> {

  private readonly confirmationService = inject(ConfirmationService);

  private readonly messageService = inject(MessageService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(BookAdminService);

  private index = -1;

  // TODO: these flags are not being used
  public readingAuthors = false;

  public readingPublishers = false;

  public readingDonors = false;

  public authorsSelection = new PaginatedResponse<Author>();

  public publishersSelection = new PaginatedResponse<Publisher>();

  public donorPage = new PaginatedResponse<Person>();

  public languages: Language[] = [];

  public readonly editionMenu: MenuItem[] = [];

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

  public get donated(): Boolean {
    return this.data.donation != undefined;
  }

  public get donors(): String {
    let data: Donor[];

    if (this.data.donation) {
      data = this.data.donation.donors;
    } else {
      data = [];
    }

    return data.map(e => e.name.fullName).join(", ");
  }

  public readonly lendPermission;

  public get lendDisabled() {
    return this.waiting || !this.lendPermission;
  }

  public view: string = '';

  public showConfirmDelete = false;

  constructor() {
    const authContainer = inject(AuthContainer);

    super(new FictionBook());
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
    this.onGoToAuthorPage(0);
    this.onGoToPublisherPage(0);
    this.onGoToDonorPage(0);

    // Load languages
    this.languages = this.service.getLanguages();

    // Load edition menu
    this.editionMenu.push(
      {
        label: 'Datos',
        command: () => this.onStartEditingView('details')
      });
    this.editionMenu.push(
      {
        label: 'Donantes',
        command: () => this.onStartEditingView('donors')
      });
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

  public onSetDonation(donation: Donation | undefined) {
    this.data.donation = donation;
    super.onSave(this.data);
  }

  public confirmDelete(event: Event) {
    this.showConfirmDelete = true;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.delete();
        this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
      }
    });
  }

  protected override delete(): void {
    // TODO: shouldn't the delete return the observable, to keep consistency?
    this.service.deleteFictionBook(this.data.number).subscribe(r => {
      this.router.navigate(['../..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<FictionBook> {
    return this.service.getOneFictionBook(this.index);
  }

  protected override save(toSave: FictionBook): Observable<FictionBook> {
    return this.service.updateFictionBook(this.data.number, toSave);
  }

}
