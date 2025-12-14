
import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MemberContact } from '@app/association/members/domain/member-contact';
import { Contact } from '@ucronia/domain';
import { DetailField } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-member-contact-details',
  imports: [CommonModule, SkeletonModule, CardModule, DetailField, DatePipe],
  templateUrl: './member-contact-details.html'
})
export class MemberContactDetails {

  public data = input<Contact | MemberContact>(new MemberContact());
  public loading = input(false);

  public get member() {
    return this.data() as MemberContact;
  }

}
