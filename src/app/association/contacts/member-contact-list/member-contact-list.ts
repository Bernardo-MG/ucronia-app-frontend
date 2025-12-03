import { Component, input, output } from '@angular/core';
import { MemberContact } from '@app/domain/contact/member-contact';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-member-contact-list',
  imports: [ButtonModule, TableModule, TagModule],
  templateUrl: './member-contact-list.html'
})
export class MemberContactList {

  public readonly data = input(new PaginatedResponse<MemberContact>());
  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);

  public readonly show = output<MemberContact>();
  public readonly edit = output<{ event: Event, contact: MemberContact }>();
  public readonly delete = output<{ event: Event, contact: number }>();
  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.data().page - 1) * this.data().size;
  }

}