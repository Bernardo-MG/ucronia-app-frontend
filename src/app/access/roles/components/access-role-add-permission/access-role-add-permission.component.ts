import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '@app/core/authentication/models/action';
import { Permission } from '@app/core/authentication/models/permission';
import { Resource } from '@app/core/authentication/models/resource';
import { TableHeaderCell } from '@app/shared/layout/models/table-header-cell';
import { TableRow } from '@app/shared/layout/models/table-row';

@Component({
  selector: 'access-role-add-permission',
  templateUrl: './access-role-add-permission.component.html',
  styleUrls: ['./access-role-add-permission.component.sass']
})
export class AccessRoleAddPermissionComponent {

  @Input() set actions(value: Action[]) {
    this.actionRows = value.map((a, i) => {
      return {id:i, cells:[a.name]};
    });
  }

  @Input() public totalActionPages = 0;

  @Input() set resources(value: Resource[]) {
    this.resourceRows = value.map((r, i) => {
      return {id:i, cells:[r.name]};
    });
  }

  @Input() public totalResourcePages = 0;

  @Output() public addPermission = new EventEmitter<Permission>();

  @Output() public selectPermission = new EventEmitter<Permission>();

  @Output() public selectAction = new EventEmitter<Permission>();

  @Output() public goToActionPage = new EventEmitter<number>();

  @Output() public goToResourcePage = new EventEmitter<number>();

  public actionHeader: TableHeaderCell[] = [{name:'Action',property:'action'}];

  public actionRows: TableRow[] = [];

  public resourceHeader: TableHeaderCell[] = [{name:'Resource',property:'resource'}];

  public resourceRows: TableRow[] = [];

  public data = new Permission();

  public view = 'main';

  public isAbleToAdd() {
    return true;
  }

  public onAddPermission(): void {
  }

  public onSelectAction(): void {
    this.goToActionPage.emit(0);
    this.view = 'action';
  }

  public onSelectResource(): void {
    this.goToResourcePage.emit(0);
    this.view = 'resource';
  }

  public onCancelSelect() {
    this.view = 'main';
  }

}
