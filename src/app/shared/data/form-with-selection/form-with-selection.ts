
import { Component, inject, Input, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { Page } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Observable, of } from 'rxjs';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'shared-form-with-selection',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, SelectModule],
  templateUrl: './form-with-selection.html'
})
export class FormWithSelection implements OnInit {

  @Input() public set data(value: NameNumber) {
    this.form.patchValue(value as any);
  }

  public readonly getSelection = input<(page: number) => Observable<Page<NameNumber>>>((page: number) => of(new Page<NameNumber>()));
  public readonly fieldLabel = input('Tipo');
  public readonly placeholder = input('Seleccione una opción');

  public readonly save = output<NameNumber>();

  public readonly formStatus;

  public loadingOptions = false;
  public options: NameNumber[] = [];

  public get name() {
    return this.form.value.name;
  }

  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [undefined, Validators.required],
      name: ['', Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnInit(): void {
    this.loadOptions();
  }

  public onChoose(number: number | undefined) {
    const selected = this.options.find(option => option.number === number);
    if (!selected) {
      return;
    }

    this.form.setValue(selected as any);
    this.form.markAsDirty();
  }

  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value as NameNumber);
    }
  }

  private loadOptions(page = 0, current: NameNumber[] = []) {
    if (page === 0) {
      this.loadingOptions = true;
    }

    this.getSelection()(page)
      .subscribe(response => {
        const options = [...current, ...response.content];

        if (response.last || page >= (response.totalPages - 1)) {
          this.options = options;
          this.loadingOptions = false;

          const selected = this.options.find(option => option.number === this.form.get('number')?.value);
          if (selected) {
            this.form.patchValue(selected as any, { emitEvent: false });
          }

          return;
        }

        this.loadOptions(page + 1, options);
      });
  }

}
