
import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus, isbnValidator } from '@bernardo-mg/form';
import { Page } from '@bernardo-mg/request';
import { FailureStore } from '@bernardo-mg/request';
import { Author, BookLending, BookType, Donation, Donor, FictionBook, GameBook, GameSystem, Language, Publisher, Title } from '@ucronia/domain';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { LibraryConfig } from '../library-config';
import { LibraryService } from '../library-service';

@Component({
  selector: 'assoc-library-book-edition-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, ButtonModule, MessageModule, SelectModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule, TableModule],
  templateUrl: './library-book-edition-form.html'
})
export class LibraryBookEditionForm implements OnChanges {

  private readonly service = inject(LibraryService);

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: FictionBook | GameBook) {
    this.isGameBook = Object.prototype.hasOwnProperty.call(value, 'gameSystem');
    this.form.patchValue(value as any);

    if (!this.isGameBook) {
      this.form.patchValue({
        gameSystem: undefined,
        bookType: undefined
      });
    }
  }

  public readonly save = output<FictionBook | GameBook>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public readonly languages: Language[] = [];
  public gameSystems: GameSystem[] = [];
  public bookTypes: BookType[] = [];

  public readonly noGameSystemOption = { number: undefined, name: 'Sin sistema' };
  public readonly noBookTypeOption = { number: undefined, name: 'Sin tipo' };

  public authorSearchValue: Author | undefined;
  public publisherSearchValue: Publisher | undefined;
  public donorSearchValue: Donor | undefined;
  public authorSearchResults: Author[] = [];
  public publisherSearchResults: Publisher[] = [];
  public donorSearchResults: Donor[] = [];

  public isGameBook = false;

  public get selectedAuthors(): Author[] {
    return this.form.get('authors')?.value ?? [];
  }

  public get selectedPublishers(): Publisher[] {
    return this.form.get('publishers')?.value ?? [];
  }

  public get selectedDonors(): Donor[] {
    return this.form.get('donation')?.get('donors')?.value ?? [];
  }

  public get selectedGameSystemNumber(): number | undefined {
    return this.form.get('gameSystem')?.value?.number;
  }

  public get selectedBookTypeNumber(): number | undefined {
    return this.form.get('bookType')?.value?.number;
  }

  public get gameSystemOptions(): Array<{ number: number | undefined; name: string }> {
    return [this.noGameSystemOption, ...this.gameSystems];
  }

  public get bookTypeOptions(): Array<{ number: number | undefined; name: string }> {
    return [this.noBookTypeOption, ...this.bookTypes];
  }

  public view = 'form';

  constructor() {
    const fb = inject(FormBuilder);
    const config = inject(LibraryConfig);

    this.languages = config.getLanguages();

    this.form = fb.group({
      number: [undefined],
      index: [-1],
      isbn: ['', isbnValidator],
      title: fb.group({
        supertitle: [''],
        title: ['', Validators.required],
        subtitle: ['']
      }),
      language: ['', Validators.required],
      publishDate: [''],
      authors: [[]],
      donation: fb.group({
        date: [''],
        donors: [[]]
      }),
      bookType: [],
      publishers: [[]],
      gameSystem: []
    });

    this.formStatus = new FormStatus(this.form);

    this.loadSelection(
      this.service.getGameSystems.bind(this.service),
      (gameSystems) => this.gameSystems = gameSystems
    );
    this.loadSelection(
      this.service.getBookTypes.bind(this.service),
      (bookTypes) => this.bookTypes = bookTypes
    );
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      const donation = this.form.get('donation')?.value as Donation;
      const hasDonationDate = !!donation?.date;
      const hasDonors = !!donation?.donors?.length;
      const value: any = {
        ...this.form.value,
        donation: hasDonationDate || hasDonors ? donation : undefined
      };

      // Valid form, can emit data
      this.save.emit(value as FictionBook | GameBook);
    }
  }

  public onSearchAuthors(event: { query: string }): void {
    this.service.searchAuthors(event.query?.trim())
      .subscribe(authors => this.authorSearchResults = authors);
  }

  public onSelectAuthor(author: Author): void {
    if (!author) {
      return;
    }

    const authors = this.form.get('authors')?.value ?? [];
    if (!authors.find((selected: Author) => selected.number === author.number)) {
      this.form.get('authors')?.setValue([...authors, author]);
      this.form.markAsDirty();
    }

    this.authorSearchValue = undefined;
    this.authorSearchResults = [];
  }

  public onRemoveAuthor(author: Author): void {
    const authors = this.form.get('authors')?.value ?? [];
    this.form.get('authors')?.setValue(authors.filter((selected: Author) => selected.number !== author.number));
    this.form.markAsDirty();
  }

  public onSearchPublishers(event: { query: string }): void {
    this.service.searchPublishers(event.query?.trim())
      .subscribe(publishers => this.publisherSearchResults = publishers);
  }

  public onSelectPublisher(publisher: Publisher): void {
    if (!publisher) {
      return;
    }

    const publishers = this.form.get('publishers')?.value ?? [];
    if (!publishers.find((selected: Publisher) => selected.number === publisher.number)) {
      this.form.get('publishers')?.setValue([...publishers, publisher]);
      this.form.markAsDirty();
    }

    this.publisherSearchValue = undefined;
    this.publisherSearchResults = [];
  }

  public onRemovePublisher(publisher: Publisher): void {
    const publishers = this.form.get('publishers')?.value ?? [];
    this.form.get('publishers')?.setValue(publishers.filter((selected: Publisher) => selected.number !== publisher.number));
    this.form.markAsDirty();
  }

  public onSearchDonors(event: { query: string }): void {
    this.service.searchDonors(event.query?.trim())
      .subscribe(donors => this.donorSearchResults = donors);
  }

  public onSelectDonor(donor: Donor): void {
    if (!donor) {
      return;
    }

    const donors = this.selectedDonors;
    if (!donors.find((selected: Donor) => selected.number === donor.number)) {
      this.form.get('donation')?.get('donors')?.setValue([...donors, donor]);
      this.form.markAsDirty();
    }

    this.donorSearchValue = undefined;
    this.donorSearchResults = [];
  }

  public onRemoveDonor(donor: Donor): void {
    this.form.get('donation')?.get('donors')?.setValue(
      this.selectedDonors.filter((selected: Donor) => selected.number !== donor.number)
    );
    this.form.markAsDirty();
  }

  public onSelectGameSystem(number: number | undefined): void {
    if (number === undefined || number === null) {
      this.form.get('gameSystem')?.setValue(undefined);
      this.form.markAsDirty();
      return;
    }

    const gameSystem = this.gameSystems.find(system => system.number === number);
    if (!gameSystem) {
      return;
    }

    this.form.get('gameSystem')?.setValue(gameSystem);
    this.form.markAsDirty();
  }

  public onSelectBookType(number: number | undefined): void {
    if (number === undefined || number === null) {
      this.form.get('bookType')?.setValue(undefined);
      this.form.markAsDirty();
      return;
    }

    const bookType = this.bookTypes.find(type => type.number === number);
    if (!bookType) {
      return;
    }

    this.form.get('bookType')?.setValue(bookType);
    this.form.markAsDirty();
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

  private loadSelection<T extends { number: number }>(
    loader: (page?: number) => import('rxjs').Observable<Page<T>>,
    setData: (data: T[]) => void,
    page = 0,
    current: T[] = []
  ): void {
    loader(page)
      .subscribe((response: Page<T>) => {
        const data = [...current, ...response.content];

        if (response.last || page >= (response.totalPages - 1)) {
          setData(data);
          return;
        }

        this.loadSelection(loader, setData, page + 1, data);
      });
  }

}

export class LibraryBookEditionFormData {
  public number = -1;
  public title = new Title();
  public lent = false;
  public isbn = '';
  public language = '';
  public publishDate: Date | undefined;
  public authors: Author[] = [];
  public lendings: BookLending[] = [];
  public publishers: Publisher[] = [];
  public donation: Donation | undefined;
  public gameSystem: GameSystem | undefined;
  public bookType: BookType | undefined;
}

