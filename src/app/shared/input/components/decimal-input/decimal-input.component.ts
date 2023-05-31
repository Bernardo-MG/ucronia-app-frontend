import { Component, Input } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'input-decimal',
  templateUrl: './decimal-input.component.html',
  styleUrls: ['./decimal-input.component.sass']
})
export class DecimalInputComponent {

  /**
   * Editable inputs form.
   */
  @Input() public editable = true;
  
  @Input() public invalid = false;
  
  @Input() public property: string = '';
  
  @Input() public name: string = '';
  
  @Input() public failures: Failure[] = [];

}
