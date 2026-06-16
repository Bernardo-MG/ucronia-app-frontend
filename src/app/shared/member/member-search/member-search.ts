import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PublicMember } from 'projects/ucronia/domain/src/lib/members/public-member';

@Component({
  selector: 'assoc-member-search',
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './member-search.html'
})
export class MemberSearch {

  public readonly members = input<PublicMember[]>([]);
  public readonly member = input(new PublicMember());

  public readonly searchMember = output<MemberSearchEvent>();
  public readonly selectMember = output<PublicMember>();

}

export class MemberSearchEvent {
  public query: string = '';
}
