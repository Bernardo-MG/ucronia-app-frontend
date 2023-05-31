import { Component, Input } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'input-month',
  templateUrl: './month-input.component.html',
  styleUrls: ['./month-input.component.sass']
})
export class MonthInputComponent {

  /**
   * Editable inputs form.
   */
  @Input() public editable = true;
  
  @Input() public invalid = false;
  
  @Input() public property: string = '';
  
  @Input() public name: string = '';
  
  @Input() public failures: Failure[] = [];

}
