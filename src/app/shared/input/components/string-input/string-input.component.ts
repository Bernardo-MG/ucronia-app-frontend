import { Component, Input } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'edition-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.sass']
})
export class StringInputComponent {

  /**
   * Editable inputs form.
   */
  @Input() public editable = true;
  
  @Input() public invalid = false;
  
  @Input() public property: string = '';
  
  @Input() public name: string = '';
  
  @Input() public failures: Failure[] = [];

}
