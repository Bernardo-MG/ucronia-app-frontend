import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { SearchSelect } from '@bernardo-mg/ui';
import { Profile } from '@ucronia/domain';

@Component({
  selector: 'assoc-member-search',
  imports: [SearchSelect],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './member-search.html'
})
export class MemberSearch<T extends MemberSearchOption = Profile> {

  public readonly disabled = input(false);
  public readonly inputId = input.required<string>();
  public readonly member = input<T | null>(null);
  public readonly members = input<T[]>([]);

  public readonly clearMember = output<void>();
  public readonly searchMember = output<MemberSearchEvent>();
  public readonly selectMember = output<T>();

  // Event handlers
  public onMemberChange(value: T | string | null): void {
    if (!value || typeof value === 'string') {
      this.clearMember.emit();
    }
  }

}

export type MemberSearchOption = Pick<Profile, 'number' | 'name'>;

export class MemberSearchEvent {
  public query: string = '';
}
