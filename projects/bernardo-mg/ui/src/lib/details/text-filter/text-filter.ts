import { Component, DestroyRef, inject, Input, input, output } from '@angular/core';
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

  public readonly label = input('Buscar');
  public readonly showLabel = input(false);
  public readonly placeholder = input('Buscar...');
  public readonly disabled = input(false);

  public readonly filter = output<string>();

  public filterValue = '';
  private readonly changes = new Subject<string>();

  @Input() public set value(value: string) {
    this.filterValue = value;
  }

  constructor() {
    this.changes.pipe(
      map(value => value.trim()),
      switchMap(value => value ? timer(300).pipe(map(() => value)) : of('')),
      distinctUntilChanged(),
      takeUntilDestroyed(inject(DestroyRef))
    ).subscribe(value => this.filter.emit(value));
  }

  public onInput(value: string): void {
    this.filterValue = value;
    this.changes.next(value);
  }

}
