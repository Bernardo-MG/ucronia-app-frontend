import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'layout-dynamic-form-body',
  templateUrl: './dynamic-form-body.component.html'
})
export class DynamicFormBodyComponent implements OnInit, OnChanges {

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
      this.form.setControl(definition.property, new FormControl(undefined, definition.validator));
    }
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

  ngOnInit(): void {
    this.listenForChanges();
  }

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
