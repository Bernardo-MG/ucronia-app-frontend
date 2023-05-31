import { Component, Input } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'input-boolean',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.sass']
})
export class BooleanInputComponent {

  /**
   * Editable inputs form.
   */
  @Input() public editable = true;
  
  @Input() public invalid = false;
  
  @Input() public property: string = '';
  
  @Input() public name: string = '';
  
  @Input() public failures: Failure[] = [];

}
