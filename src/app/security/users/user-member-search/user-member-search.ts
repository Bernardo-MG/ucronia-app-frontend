import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Member } from 'projects/ucronia/domain/src/lib/members/member';

@Component({
  selector: 'assoc-user-member-search',
  imports: [FormsModule,ReactiveFormsModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './user-member-search.html'
})
export class UserMemberSearch {
  
  public readonly members = input<Member[]>([]);
  
  public readonly searchMember = output<UserSearchEvent>();
  public readonly selectMember = output<Member>();

}

export class UserSearchEvent {
  public query: string = '';
}
