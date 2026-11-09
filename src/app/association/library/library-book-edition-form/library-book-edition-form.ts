import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus, isbnValidator } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { SearchSelect } from '@bernardo-mg/ui';
import { Author, BookLending, BookType, Donation, Donor, FictionBook, GameBook, GameSystem, Language, Publisher, Title } from '@ucronia/domain';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { LibraryConfig } from '../library-config';

@Component({
  selector: 'assoc-library-book-edition-form',
  imports: [SearchSelect, FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, MessageModule, SelectModule],
  templateUrl: './library-book-edition-form.html'
})
export class LibraryBookEditionForm {

  public readonly bookTypes = input<BookType[]>([]);
  @Input() public set data(value: FictionBook | GameBook) {
    this.onClearDonorSearch();
    this.isGameBook = Object.prototype.hasOwnProperty.call(value, 'gameSystem');

    this.form.reset({
      ...value,
      donation: value.donation ?? { date: null, donors: [] },
      gameSystem: this.isGameBook ? (value as GameBook).gameSystem : undefined,
      bookType: this.isGameBook ? (value as GameBook).bookType : undefined
    });
  }
  public readonly donorSearchResults = input<Donor[]>([]);
  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  public readonly gameSystems = input<GameSystem[]>([]);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly clearDonorSearch = output<void>();
  public readonly save = output<FictionBook | GameBook>();
  public readonly searchDonors = output<string>();

  public get bookTypeOptions(): Array<{ number: number | undefined; name: string }> {
    return [this.noBookTypeOption, ...this.bookTypes()];
  }
  public donorSearchValue: Donor | undefined;
  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get gameSystemOptions(): Array<{ number: number | undefined; name: string }> {
    return [this.noGameSystemOption, ...this.gameSystems()];
  }
  public isGameBook = false;
  public readonly languages: Language[] = [];
  public readonly noBookTypeOption = {
    number: undefined,
    name: 'Sin tipo'
  };
  public readonly noGameSystemOption = {
    number: undefined,
    name: 'Sin sistema'
  };
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
  public readonly searchId = crypto.randomUUID();
  public get selectedAuthors(): Author[] {
    return this.form.get('authors')?.value ?? [];
  }
  public get selectedBookTypeNumber(): number | undefined {
    return this.form.get('bookType')?.value?.number;
  }
  public get selectedDonors(): Donor[] {
    return this.form.get('donation')?.get('donors')?.value ?? [];
  }
  public get selectedGameSystemNumber(): number | undefined {
    return this.form.get('gameSystem')?.value?.number;
  }
  public get selectedPublishers(): Publisher[] {
    return this.form.get('publishers')?.value ?? [];
  }

  public constructor() {
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
  }

  // Event handlers
  public onClearDonorSearch(): void {
    this.donorSearchValue = undefined;
    this.clearDonorSearch.emit();
  }

  public onRemoveAuthor(author: Author): void {
    const authors = this.selectedAuthors.filter(selected => selected.number !== author.number);

    this.form.get('authors')?.setValue(authors);
    this.form.markAsDirty();
  }

  public onRemoveDonor(donor: Donor): void {
    const donors = this.selectedDonors.filter(selected => selected.number !== donor.number);

    this.form.get('donation')?.get('donors')?.setValue(donors);
    this.form.markAsDirty();
  }

  public onRemovePublisher(publisher: Publisher): void {
    const publishers = this.selectedPublishers.filter(selected => selected.number !== publisher.number);

    this.form.get('publishers')?.setValue(publishers);
    this.form.markAsDirty();
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      const donation = this.form.get('donation')?.value as Donation;
      const hasDonationDate = !!donation?.date;
      const hasDonors = !!donation?.donors?.length;
      const value = {
        ...this.form.value,
        donation: hasDonationDate || hasDonors ? donation : undefined
      };
      this.save.emit(value as FictionBook | GameBook);
    }
  }

  public onSearchDonors(event: { query: string }): void {
    this.searchDonors.emit(event.query);
  }

  public onSelectAuthor(author: Author): void {
    if (!author) {
      return;
    }

    const authors = this.selectedAuthors;
    const alreadySelected = authors.some(selected => selected.number === author.number);

    if (!alreadySelected) {
      this.form.get('authors')?.setValue([...authors, author]);
      this.form.markAsDirty();
    }

  }

  public onSelectBookType(number: number | undefined): void {
    if (number === undefined || number === null) {
      this.form.get('bookType')?.setValue(undefined);
      this.form.markAsDirty();
      return;
    }

    const bookType = this.bookTypes().find(type => type.number === number);

    if (!bookType) {
      return;
    }

    this.form.get('bookType')?.setValue(bookType);
    this.form.markAsDirty();
  }

  public onSelectDonor(donor: Donor): void {
    if (!donor) {
      return;
    }

    const donors = this.selectedDonors;
    const alreadySelected = donors.some(selected => selected.number === donor.number);

    if (!alreadySelected) {
      this.form.get('donation')?.get('donors')?.setValue([...donors, donor]);
      this.form.markAsDirty();
    }

    this.onClearDonorSearch();
  }

  public onSelectGameSystem(number: number | undefined): void {
    if (number === undefined || number === null) {
      this.form.get('gameSystem')?.setValue(undefined);
      this.form.markAsDirty();
      return;
    }

    const gameSystem = this.gameSystems().find(system => system.number === number);

    if (!gameSystem) {
      return;
    }

    this.form.get('gameSystem')?.setValue(gameSystem);
    this.form.markAsDirty();
  }

  public onSelectPublisher(publisher: Publisher): void {
    if (!publisher) {
      return;
    }

    const publishers = this.selectedPublishers;
    const alreadySelected = publishers.some(selected => selected.number === publisher.number);

    if (!alreadySelected) {
      this.form.get('publishers')?.setValue([...publishers, publisher]);
      this.form.markAsDirty();
    }

  }

  // Public methods
  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
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
