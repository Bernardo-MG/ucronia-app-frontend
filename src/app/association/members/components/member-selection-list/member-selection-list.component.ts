import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Member } from '@app/association/models/member';
import { TableHeaderCell } from '@app/shared/layout/models/table-header-cell';
import { TableRenderer } from '@app/shared/layout/models/table-renderer';
import { TableRow } from '@app/shared/layout/models/table-row';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'member-selection-list',
  templateUrl: './member-selection-list.component.html'
})
export class MemberSelectionListComponent implements OnChanges {

  @Input() public members: Member[] = [];

  public header: TableHeaderCell[] = [{ name: 'Name', property: 'name' }, { name: 'Surname', property: 'surname' }, { name: 'Active', property: 'active' }];

  public renderers: TableRenderer[] = [];

  public rows: TableRow[] = [];

  public activeIcon = faCheck;
  public inactiveIcon = faX;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['members']) {
      this.rows = this.members.map(m => {
        return {
          id: m.id,
          cells: [m.name, m.surname, m.active]
        };
      });
    }
  }

}
