import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Action } from '@app/core/authentication/models/action';
import { Permission } from '@app/core/authentication/models/permission';
import { Resource } from '@app/core/authentication/models/resource';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-add-permission',
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent implements OnChanges {

  @Input() public roleId = 0;

  @Output() public addPermission = new EventEmitter<Permission>();

  public actions: Action[] = [];

  public resources: Resource[] = [];

  public totalActionPages = 0;

  public totalResourcePages = 0;

  public data = new Permission();

  public view = 'main';

  public action = new Action();

  public resource = new Resource();

  public searchIcon = faMagnifyingGlass;

  public readingActionsSelection = false;

  public readingResourcesSelection = false;

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['roleId']) {
      this.loadPermissionSelectionPage(0);
    }
  }

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
    this.onGoToActionSelectionPage(0);
    this.view = 'action';
  }

  public onShowResourceSelection(): void {
    this.onGoToResourceSelectionPage(0);
    this.view = 'resource';
  }

  public onSelectAction(id: number): void {
    const found = this.actions.find(a => a.id === id);
    if (found) {
      this.action = found;
      this.view = 'main';
    }
  }

  public onSelectResource(id: number): void {
    const found = this.resources.find(a => a.id === id);
    if (found) {
      this.resource = found;
      this.view = 'main';
    }
  }

  public onCancelSelect() {
    this.view = 'main';
  }

  public loadPermissionSelectionPage(page: number) {
    this.readingActionsSelection = true;
    this.service.getActionSelection(page).subscribe({
      next: response => {
        this.actions = response.content;
        this.totalActionPages = response.totalPages;
        this.readingActionsSelection = false;
      },
      error: error => {
        this.readingActionsSelection = false;
      }
    });
    this.readingResourcesSelection = true;
    this.service.getResourceSelection(page).subscribe({
      next: response => {
        this.resources = response.content;
        this.totalResourcePages = response.totalPages;
        this.readingResourcesSelection = false;
      },
      error: error => {
        this.readingResourcesSelection = false;
      }
    });
  }

  public onGoToActionSelectionPage(page: number) {
    this.readingActionsSelection = true;
    this.service.getActionSelection(page).subscribe(response => {
      this.actions = response.content;
      this.totalActionPages = response.totalPages;
      this.readingActionsSelection = false;
    });
  }

  public onGoToResourceSelectionPage(page: number) {
    this.readingResourcesSelection = true;
    this.service.getResourceSelection(page).subscribe(response => {
      this.resources = response.content;
      this.totalResourcePages = response.totalPages;
      this.readingResourcesSelection = false;
    });
  }

}
