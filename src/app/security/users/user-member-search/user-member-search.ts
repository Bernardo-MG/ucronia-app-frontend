import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PublicMember } from 'projects/ucronia/domain/src/lib/members/public-member';

@Component({
  selector: 'assoc-user-member-search',
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './user-member-search.html'
})
export class UserMemberSearch {

  public readonly members = input<PublicMember[]>([]);
  public readonly member = input(new PublicMember());

  public readonly searchMember = output<UserSearchEvent>();
  public readonly selectMember = output<PublicMember>();

}

export class UserSearchEvent {
  public query: string = '';
}
