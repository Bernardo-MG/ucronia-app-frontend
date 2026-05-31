import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Member } from 'projects/ucronia/domain/src/lib/members/member';

@Component({
  selector: 'assoc-fee-member-search',
  imports: [FormsModule,ReactiveFormsModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './fee-member-search.html'
})
export class FeeMemberSearch {
  
  public readonly members = input<Member[]>([]);
  
  public readonly searchMember = output<FeeSearchEvent>();
  public readonly selectMember = output<Member>();

}

export class FeeSearchEvent {
  public query: string = '';
}
