import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';

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

  @Input() public failures: Map<string, Failure[]> = new Map<string, Failure[]>();

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
