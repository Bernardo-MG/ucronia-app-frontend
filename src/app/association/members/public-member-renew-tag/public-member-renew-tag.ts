import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TagModule } from '@openng/optimus-ui/tag';

@Component({
  selector: 'assoc-public-member-renew-tag',
  imports: [TagModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './public-member-renew-tag.html'
})
export class PublicMemberRenewTag {

  public readonly renew = input(true);

}
