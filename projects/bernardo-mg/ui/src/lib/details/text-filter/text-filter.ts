import { Component, input, linkedSignal, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { distinctUntilChanged, map, of, Subject, switchMap, timer } from 'rxjs';
import { FormSearchReset } from '../form-search-reset';

@Component({
  selector: 'ui-text-filter',
  imports: [FormsModule, InputTextModule, IconFieldModule, InputIconModule, FormSearchReset],
  templateUrl: './text-filter.html'
})
export class TextFilter {

  public readonly disabled = input(false);
  public readonly label = input('Buscar');
  public readonly placeholder = input('Buscar...');
  public readonly showLabel = input(false);
  public readonly value = input('');

  public readonly filter = output<string>();

  protected readonly filterValue = linkedSignal(() => this.value());

  private readonly changes = new Subject<string>();

  public constructor() {
    this.changes.pipe(
      map(value => value.trim()),
      switchMap(value => value ? timer(300).pipe(map(() => value)) : of('')),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(value => this.filter.emit(value));
  }

  // Event handlers
  protected onInput(value: string): void {
    this.filterValue.set(value);
    this.changes.next(value);
  }

}
