import { Component, Input } from '@angular/core';
import { FormBaseComponent } from '@app/shared/edition/components/form-base/form-base.component';

@Component({
  selector: 'assoc-member-create-form',
  templateUrl: './member-create-form.component.html'
})
export class MemberCreateFormComponent extends FormBaseComponent {

  /**
   * Loading flag.
   */
  @Input() public saving = false;

  public isEditable() {
    return true;
  }

}
