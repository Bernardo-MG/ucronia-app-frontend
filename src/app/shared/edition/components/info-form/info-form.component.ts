import { Component, Input } from '@angular/core';
import { FormDescription } from '../../models/form-description';

@Component({
  selector: 'edition-info-form',
  templateUrl: './info-form.component.html'
})
export class InfoFormComponent {

  @Input() public fields: FormDescription[] = [];

  @Input() public data: any;

  public editing = false;

}
