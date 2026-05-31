import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PublicMember } from 'projects/ucronia/domain/src/lib/members/public-member';

@Component({
  selector: 'assoc-fee-member-search',
  imports: [FormsModule,ReactiveFormsModule, AutoCompleteModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './fee-member-search.html'
})
export class FeeMemberSearch {
  
  public readonly members = input<PublicMember[]>([]);
  
  public readonly searchMember = output<FeeSearchEvent>();
  public readonly selectMember = output<PublicMember>();

}

export class FeeSearchEvent {
  public query: string = '';
}
