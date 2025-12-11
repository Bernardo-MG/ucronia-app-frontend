
import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MemberContact } from '@app/association/members/domain/member-contact';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { DetailField } from '../../../../../projects/bernardo-mg/ui/src/public-api';

@Component({
  selector: 'assoc-member-contact-details',
  imports: [CommonModule, SkeletonModule, CardModule, DetailField, DatePipe],
  templateUrl: './member-contact-details.html'
})
export class MemberContactDetails {

  public contact = input(new MemberContact());
  public loading = input(false);

}
