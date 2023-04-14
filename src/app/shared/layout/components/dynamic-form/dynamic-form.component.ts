import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'layout-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.sass']
})
export class DynamicFormComponent {
  
  /**
   * Saving flag.
   */
  @Input() public saving = false;

  @Input() public formValid = false;
  
  @Input() public disabled = false;

  @Input() public fields: FormDescription[] = [];
  
  @Input() public data: any;

  @Output() public save = new EventEmitter<any>();

  @Output() public cancel = new EventEmitter<void>();

  public onSave(): void {
    this.save.emit(this.data);
  }

  public isAbleToSave() {
    return ((this.formValid) && (!this.saving));
  }

  public onFormValidChange(valid: boolean): void {
    this.formValid = valid;
  }

  public onFormChange(value: any) {
    this.data = value;
  }

}
