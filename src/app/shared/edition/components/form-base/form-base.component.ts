import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'edition-form-base',
  templateUrl: './form-base.component.html'
})
export class FormBaseComponent implements OnInit, OnChanges {

  /**
   * Loading flag.
   */
  @Input() public saving = false;

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

  public valid = false;

  constructor(
    public form: FormGroup
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

  private listenForChanges() {
    this.form.statusChanges.subscribe(status => {
      this.valid = (status === "VALID");
    });
    this.form.valueChanges.subscribe(value => {
      this.valueChange.emit(value);
    });
  }

  public isSaveDisabled() {
    return !this.editable || !this.isAbleToSave();
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}
