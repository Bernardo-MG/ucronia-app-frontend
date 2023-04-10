import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from '@app/association/models/member';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'layout-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.sass']
})
export class DynamicFormComponent {

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

  @Input() set fields(data: FormDescription[]) {
    this._fields = data;

    const formProperties: any = {};
    formProperties['id'] = [-1];
    for (let i = 0; i < data.length; i++) {
      const input = data[i];
      let value;
      if (input.type === 'boolean') {
        value = false;
      } else {
        value = '';
      }

      formProperties[data[i].property] = [value];
      // name: ['', Validators.required]
    }
    this.form = this.fb.group(formProperties);
  }

  get fields(): FormDescription[] {
    return this._fields;
  }

  @Input() public data: any;

  @Output() public save = new EventEmitter<Member>();

  @Output() public valueChange = new EventEmitter<Member>();

  @Output() public validChange = new EventEmitter<boolean>();

  public form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) {
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

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data']) && (!changes['data'].firstChange)) {
      this.form.patchValue(this.data);
    }
  }

  public onSave() {
    this.save.emit(this.form.value);
  }

}
