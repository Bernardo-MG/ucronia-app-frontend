import { AfterViewInit, DestroyRef, Directive, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroupDirective, FormResetEvent, NgForm } from '@angular/forms';
import { asapScheduler, filter, observeOn } from 'rxjs';

/** Keep search state in step with the enclosing Angular form. */
@Directive({ selector: '[uiFormSearchReset]' })
export class FormSearchReset implements AfterViewInit {

  private readonly group = inject(FormGroupDirective, { optional: true });
  private readonly templateForm = inject(NgForm, { optional: true });
  private readonly destroyRef = inject(DestroyRef);
  public readonly searchReset = output<void>();

  public ngAfterViewInit(): void {
    const form = this.group?.form ?? this.templateForm?.form;
    form?.events.pipe(
      filter(event => event instanceof FormResetEvent),
      // A form can reset while its parent is binding the new record.
      observeOn(asapScheduler),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.searchReset.emit());
  }

}
