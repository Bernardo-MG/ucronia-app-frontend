import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { TextFilter } from '@bernardo-mg/ui';
import { KeyAssignment } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-member-key-list',
  imports: [TextFilter, ButtonModule, CardModule, MessageModule, TableModule, TagModule],
  templateUrl: './member-key-list.html'
})
export class MemberKeyList implements OnChanges {

  public readonly data = input<KeyAssignment[]>([]);
  public readonly loading = input(false);
  public readonly error = input(false);

  public readonly show = output<KeyAssignment>();
  public readonly retry = output<void>();

  public first = 0;

  public get assigned(): number {
    return this.data().filter(key => key.profile != null).length;
  }

  public get unassigned(): number {
    return this.data().length - this.assigned;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.first = 0;
    }
  }

}
