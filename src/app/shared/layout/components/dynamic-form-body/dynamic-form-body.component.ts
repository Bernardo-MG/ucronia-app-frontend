import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'layout-dynamic-form-body',
  templateUrl: './dynamic-form-body.component.html',
  styleUrls: ['./dynamic-form-body.component.sass']
})
export class DynamicFormBodyComponent {

  /**
   * Disabled flag.
   */
  @Input() set disabled(flag: boolean) {
    if (flag) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  private _fields: FormDescription[] = [];

  @Input() set fields(definitions: FormDescription[]) {
    this._fields = definitions;

    const formProperties: any = {};
    formProperties['id'] = [-1];
    for (let i = 0; i < definitions.length; i++) {
      const definition = definitions[i];
      formProperties[definition.property] = [undefined, definition.validator];
    }
    this.form = this.fb.group(formProperties);
    // TODO: Remove previous subscribe
    this.listenForChanges();
  }

  get fields(): FormDescription[] {
    return this._fields;
  }

  @Input() public data: any;

  @Output() public save = new EventEmitter<any>();

  @Output() public valueChange = new EventEmitter<any>();

  @Output() public validChange = new EventEmitter<boolean>();

  public form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data']) && (!changes['data'].firstChange)) {
      this.form.patchValue(this.data);
    }
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

  public isInvalid(property: string) {
    return this.form.get(property)?.errors;
  }

  private listenForChanges() {
    this.form.statusChanges.subscribe(status => {
      if (status === "VALID") {
        this.validChange.emit(true);
      } else {
        this.validChange.emit(false);
      }
    });
    this.form.valueChanges.subscribe(value => {
      this.valueChange.emit(value);
    });
  }

}
