
import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MemberContact } from '@app/domain/contact/member-contact';
import { Member } from '@app/domain/members/member';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-member-contact-details',
  imports: [CommonModule, SkeletonModule, DatePipe],
  templateUrl: './member-contact-details.html'
})
export class MemberContactDetails {

  public contact = input(new MemberContact());
  public member = input(new Member());
  public loading = input(false);

}
