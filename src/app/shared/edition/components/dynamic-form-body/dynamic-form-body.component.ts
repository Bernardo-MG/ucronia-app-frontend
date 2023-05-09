import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'edition-dynamic-form-body',
  templateUrl: './dynamic-form-body.component.html'
})
export class DynamicFormBodyComponent implements OnInit, OnChanges {

  /**
   * Disabled form flag.
   */
  @Input() set disabled(flag: boolean) {
    if (flag) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  /**
   * Editable inputs form.
   */
  @Input() public editable = true;

  private _fields: FormDescription[] = [];

  @Input() public set fields(fields: FormDescription[]) {
    const group:{ [key: string]: any } = {};

    this._fields = fields;

    // Id always exists
    group['id'] = new FormControl(-1);
    for (let i = 0; i < fields.length; i++) {
      const definition = fields[i];
      group[definition.property] = new FormControl({ value: undefined, disabled: !definition.editable }, definition.validator);
    }

    this.form = this.fb.group(group);
  }

  public get fields(): FormDescription[] {
    return this._fields;
  }

  @Input() public data: any;

  public fieldFailures: Map<string, Failure[]> = new Map<string, Failure[]>();

  @Input() set failures(values: Failure[]) {
    this.fieldFailures = new Map<string, Failure[]>();
    for (const failure of values) {
      if (failure.field) {
        if (this.fieldFailures.get(failure.field)) {
          const values = (this.fieldFailures.get(failure.field) as Failure[]);
          values.push(failure);
          this.fieldFailures.set(failure.field, values);
        } else {
          this.fieldFailures.set(failure.field, [failure]);
        }
      }
    }
  }

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

  public isInvalid(property: string): boolean {
    return (this.form.get(property)?.invalid) || (this.fieldFailures.get(property) !== undefined);
  }

  public getFailures(property: string): Failure[] {
    const map = this.fieldFailures;
    let failures: Failure[];

    if (map.get(property)) {
      failures = (map.get(property) as Failure[]);
    } else {
      failures = [];
    }

    return failures;
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
