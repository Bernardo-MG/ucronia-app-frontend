import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-member-renew-tag',
  imports: [TagModule],
  templateUrl: './member-renew-tag.html'
})
export class MemberRenewTag {

  public readonly renew = input(true);

}
