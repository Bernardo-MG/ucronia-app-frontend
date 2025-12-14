
import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField } from '@bernardo-mg/ui';
import { Contact } from '@ucronia/domain';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { MemberContact } from '@ucronia/api';

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
