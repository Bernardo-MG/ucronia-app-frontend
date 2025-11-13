
import { Component, input } from '@angular/core';
import { PublicMember } from '@app/domain/members/public-member';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-public-member-info',
  imports: [SkeletonModule],
  templateUrl: './public-member-info.html'
})
export class PublicMemberInfo {

  public data = input(new PublicMember());

  public loading = input(false);

}
