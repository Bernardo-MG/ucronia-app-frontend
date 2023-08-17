import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '@app/core/authentication/models/action';
import { Permission } from '@app/core/authentication/models/permission';
import { Resource } from '@app/core/authentication/models/resource';
import { TableHeaderCell } from '@app/shared/layout/models/table-header-cell';
import { TableRow } from '@app/shared/layout/models/table-row';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'access-role-add-permission',
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent {

  private _actions: Action[] = [];

  @Input() set actions(value: Action[]) {
    this._actions = value;
    this.actionRows = value.map((a, i) => {
      return { id: i, cells: [a.name] };
    });
  }

  @Input() public totalActionPages = 0;

  private _resources: Resource[] = [];

  @Input() set resources(value: Resource[]) {
    this._resources = value;
    this.resourceRows = value.map((r, i) => {
      return { id: i, cells: [r.name] };
    });
  }

  @Input() public totalResourcePages = 0;

  @Output() public addPermission = new EventEmitter<Permission>();

  @Output() public goToActionPage = new EventEmitter<number>();

  @Output() public goToResourcePage = new EventEmitter<number>();

  public actionHeader: TableHeaderCell[] = [{ name: 'Action', property: 'action' }];

  public actionRows: TableRow[] = [];

  public resourceHeader: TableHeaderCell[] = [{ name: 'Resource', property: 'resource' }];

  public resourceRows: TableRow[] = [];

  public data = new Permission();

  public view = 'main';

  public action = new Action();

  public resource = new Resource();

  public searchIcon = faMagnifyingGlass;

  public isAbleToAdd() {
    return (this.action.id > 0) && (this.resource.id > 0);
  }

  public onAddPermission(): void {
    const permission = new Permission();
    permission.actionId = this.action.id;
    permission.resourceId = this.resource.id;
    this.addPermission.emit(permission);
    this.action = new Action();
    this.resource = new Resource();
  }

  public onShowActionSelection(): void {
    this.goToActionPage.emit(0);
    this.view = 'action';
  }

  public onShowResourceSelection(): void {
    this.goToResourcePage.emit(0);
    this.view = 'resource';
  }

  public onSelectAction(index: number): void {
    this.action = this._actions[index];
    this.view = 'main';
  }

  public onSelectResource(index: number): void {
    this.resource = this._resources[index];
    this.view = 'main';
  }

  public onCancelSelect() {
    this.view = 'main';
  }

}
