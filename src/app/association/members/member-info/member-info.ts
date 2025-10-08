
import { Component, input } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-member-info',
  imports: [SkeletonModule],
  templateUrl: './member-info.html'
})
export class MemberInfo {

  public data = input(new Member());

  public loading = input(false);

}
