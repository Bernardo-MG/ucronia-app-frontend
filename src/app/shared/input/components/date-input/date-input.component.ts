import { Component, Input } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'input-date',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.sass']
})
export class DateInputComponent {

  /**
   * Editable inputs form.
   */
  @Input() public editable = true;
  
  @Input() public invalid = false;
  
  @Input() public property: string = '';
  
  @Input() public name: string = '';
  
  @Input() public failures: Failure[] = [];

}
