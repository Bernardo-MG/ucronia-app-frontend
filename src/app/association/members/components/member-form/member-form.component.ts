import { Component, Input } from '@angular/core';
import { FormBaseComponent } from '@app/shared/edition/components/form-base/form-base.component';

@Component({
  selector: 'assoc-member-form',
  templateUrl: './member-form.component.html'
})
export class MemberFormComponent extends FormBaseComponent {

  /**
   * Loading flag.
   */
  @Input() public saving = false;

  public isEditable() {
    return true;
  }

}
