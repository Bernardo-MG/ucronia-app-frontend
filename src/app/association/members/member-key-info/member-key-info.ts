import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { KeyAssignment } from '@ucronia/domain';

@Component({
  selector: 'assoc-member-key-info',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './member-key-info.html'
})
export class MemberKeyInfo {

  public readonly data = input.required<KeyAssignment>();

}
