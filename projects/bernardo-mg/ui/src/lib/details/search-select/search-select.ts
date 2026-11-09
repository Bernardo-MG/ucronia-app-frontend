import { Component, effect, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { map, of, Subject, switchMap, timer } from 'rxjs';
import { FormSearchReset } from '../form-search-reset';

@Component({
  selector: 'ui-search-select',
  imports: [FormsModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule, FormSearchReset],
  templateUrl: './search-select.html'
})
export class SearchSelect<T> {

  public readonly clearOnSelect = input(false);
  public readonly disabled = input(false);
  public readonly inputId = input.required<string>();
  public readonly label = input('Buscar');
  public readonly optionLabel = input('name');
  public readonly placeholder = input('Buscar...');
  public readonly suggestions = input<T[]>([]);
  public readonly value = input<T | null | undefined>(null);

  public readonly cleared = output<void>();
  public readonly queryChange = output<string>();
  public readonly selected = output<T>();

  public viewValue: T | string | null = null;

  private readonly queries = new Subject<string>();

  public constructor() {
    this.queries.pipe(
      map(query => query.trim()),
      switchMap(query => query ? timer(300).pipe(map(() => query)) : of('')),
      takeUntilDestroyed()
    ).subscribe(query => this.queryChange.emit(query));

    effect(() => {
      const value = this.value();
      // Clearing the submitted identifier while typing must preserve the text.
      if (value != null || typeof this.viewValue !== 'string') {
        this.viewValue = value ?? null;
      }
    });
  }

  // Event handlers
  protected onFormReset(): void {
    this.viewValue = this.value() ?? null;
    this.queries.next('');
  }

  protected onInput(event: Event): void {
    this.viewValue = (event.target as HTMLInputElement).value;
    this.queries.next('');
    this.cleared.emit();
  }

  public onSearch(query: string): void {
    const current = typeof this.viewValue === 'string' ? this.viewValue.trim() : '';
    // An autocomplete callback must still match the current input text.
    this.queries.next(query.trim() === current ? current : '');
  }

  public onSelect(value: T): void {
    this.viewValue = this.clearOnSelect() ? null : value;
    this.selected.emit(value);
  }

  public onValueChange(value: T | string | null): void {
    this.viewValue = value;
    if (!value || typeof value === 'string') {
      this.queries.next('');
      this.cleared.emit();
    }
  }

}
