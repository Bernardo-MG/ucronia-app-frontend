import { Component, Input } from '@angular/core';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'edition-dynamic-info-form',
  templateUrl: './dynamic-info-form.component.html'
})
export class DynamicInfoFormComponent {

  @Input() public fields: FormDescription[] = [];

  @Input() public data: any;

  public editing = false;

}
