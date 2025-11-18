
import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MemberContact } from '@app/domain/contact/member-contact';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-member-contact-details',
  imports: [CommonModule, SkeletonModule, DatePipe],
  templateUrl: './member-contact-details.html'
})
export class MemberContactDetails {

  public data = input(new MemberContact());

  public loading = input(false);

}
