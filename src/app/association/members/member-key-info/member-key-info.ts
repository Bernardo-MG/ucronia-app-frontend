import { Component, input } from '@angular/core';
import { KeyAssignment } from '@ucronia/domain';

@Component({
  selector: 'assoc-member-key-info',
  templateUrl: './member-key-info.html'
})
export class MemberKeyInfo {

  public readonly data = input.required<KeyAssignment>();

}
