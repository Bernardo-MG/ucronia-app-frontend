import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '@app/core/authentication/models/action';
import { Permission } from '@app/core/authentication/models/permission';
import { Resource } from '@app/core/authentication/models/resource';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'access-role-add-permission',
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent {

  @Input() public actions: Action[] = [];

  @Input() public totalActionPages = 0;

  @Input() public resources: Resource[] = [];

  @Input() public totalResourcePages = 0;

  @Output() public addPermission = new EventEmitter<Permission>();

  @Output() public goToActionPage = new EventEmitter<number>();

  @Output() public goToResourcePage = new EventEmitter<number>();

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
    this.action = this.actions[index];
    this.view = 'main';
  }

  public onSelectResource(index: number): void {
    this.resource = this.resources[index];
    this.view = 'main';
  }

  public onCancelSelect() {
    this.view = 'main';
  }

}
