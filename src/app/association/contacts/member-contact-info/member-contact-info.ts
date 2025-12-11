
import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MemberContact } from '@app/association/members/domain/member-contact';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-member-contact-info',
  imports: [CommonModule, SkeletonModule, DatePipe],
  templateUrl: './member-contact-info.html'
})
export class MemberContactInfo {

  public readonly data = input(new MemberContact());
  public readonly loading = input(false);

  public get isActive() {
    return this.data().active;
  }

  public get isRenewed() {
    return this.data().renew;
  }

}
