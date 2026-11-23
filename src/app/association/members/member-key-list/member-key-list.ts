import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { TextFilter } from '@bernardo-mg/ui';
import { KeyAssignment } from '@ucronia/domain';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CardModule } from '@openng/optimus-ui/card';
import { MessageModule } from '@openng/optimus-ui/message';
import { TableModule } from '@openng/optimus-ui/table';
import { TagModule } from '@openng/optimus-ui/tag';

@Component({
  selector: 'assoc-member-key-list',
  imports: [TextFilter, ButtonModule, CardModule, MessageModule, TableModule, TagModule],
  templateUrl: './member-key-list.html'
})
export class MemberKeyList implements OnChanges {

  public readonly data = input<KeyAssignment[]>([]);
  public readonly error = input(false);
  public readonly loading = input(false);

  public readonly retry = output<void>();
  public readonly show = output<KeyAssignment>();

  public get assigned(): number {
    return this.data().filter(key => key.profile != null).length;
  }
  public first = 0;
  public get unassigned(): number {
    return this.data().length - this.assigned;
  }

  // Lifecycle hooks
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.first = 0;
    }
  }

}
