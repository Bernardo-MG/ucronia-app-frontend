import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Profile } from '@ucronia/domain';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'assoc-member-search',
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './member-search.html'
})
export class MemberSearch {

  public readonly members = input<Profile[]>([]);
  public readonly member = input(new Profile());

  public readonly searchMember = output<MemberSearchEvent>();
  public readonly selectMember = output<Profile>();

}

export class MemberSearchEvent {
  public query: string = '';
}
