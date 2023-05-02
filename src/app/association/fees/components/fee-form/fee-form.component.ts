import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';

@Component({
  selector: 'assoc-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent {

  @Input() public data: any;

  @Input() public failures: Failure[] = [];

  @Input() public saving = false;

  @Output() public save = new EventEmitter<any>();

  public fields: FormDescription[] = [
    new FormDescription('Date', 'date', 'month'),
    new FormDescription('Paid', 'paid', 'boolean', Validators.required)
  ];

  public onSave(data: any): void {
    this.save.emit(data);
  }

}
