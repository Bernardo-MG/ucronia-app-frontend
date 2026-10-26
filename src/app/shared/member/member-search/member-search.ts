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
export class MemberSearch<T extends Pick<Profile, 'number' | 'name'> = Profile> {

  public readonly inputId = input('memberSearchInput');
  public readonly disabled = input(false);

  public readonly members = input<T[]>([]);
  public readonly member = input<T | null>(null);

  public readonly searchMember = output<MemberSearchEvent>();
  public readonly selectMember = output<T>();
  public readonly clearMember = output<void>();

  public onMemberChange(value: T | string | null): void {
    if (!value || typeof value === 'string') {
      this.clearMember.emit();
    }
  }

}

export class MemberSearchEvent {
  public query: string = '';
}
