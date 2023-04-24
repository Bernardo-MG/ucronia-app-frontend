import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '../../../layout/models/form-description';

@Component({
  selector: 'edition-dynamic-form-body',
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

  @Input() public set fields(definitions: FormDescription[]) {
    this._fields = definitions;

    // Id always exists
    this.form.setControl('id', new FormControl(-1));
    for (let i = 0; i < definitions.length; i++) {
      const definition = definitions[i];
      this.form.setControl(definition.property, new FormControl(undefined, definition.validator));
    }
  }

  public get fields(): FormDescription[] {
    return this._fields;
  }

  @Input() public data: any;

  @Input() public failures: Failure[] = [];

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
    return (this.form.get(property)?.invalid) || (this.getFailuresMap().get(property) !== undefined);
  }

  public getFailures(property: string): Failure[] {
    const map = this.getFailuresMap();
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

  private getFailuresMap(): Map<string, Failure[]> {
    const map = new Map<string, Failure[]>();
    for (const failure of this.failures) {
      if (failure.field) {
        if (map.get(failure.field)) {
          const values = (map.get(failure.field) as Failure[]);
          values.push(failure);
          map.set(failure.field, values);
        } else {
          map.set(failure.field, [failure]);
        }
      }
    }
    return map;
  }

}
