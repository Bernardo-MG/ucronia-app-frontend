import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer, Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize } from 'rxjs';
import { AccessRoleInfo } from '../access-role-info/access-role-info';
import { AccessRoleService } from '../access-role-service';

@Component({
  selector: 'access-role-list',
  imports: [RouterModule, CardModule, TableModule, ButtonModule, MenuModule, DrawerModule, IconAddComponent, AccessRoleInfo],
  templateUrl: './access-role-list.html'
})
export class AccessRoleList implements OnInit {

  private readonly router = inject(Router);
  private readonly service = inject(AccessRoleService);

  @ViewChild('editionMenu') editionMenu!: Menu;

  public readonly createPermission;

  public readonly editable;

  public readonly editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Role>();

  public selectedData = new Role();

  /**
   * Loading flag.
   */
  public loading = false;
  public showing = false;
  public editing = false;

  private sort = new Sorting();

  public view: string = '';

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createPermission = authContainer.hasPermission("role", "create");
    this.editable = authContainer.hasPermission("role", "update");

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Cambiar permisos',
        command: () => this.onStartEditingView('permissions')
      });
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public onShowInfo(role: Role) {
    this.selectedData = role;
    this.showing = true;
  }

  public openEditionMenu(event: Event, role: Role) {
    this.selectedData = role;
    this.editionMenu.toggle(event);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    let direction;
    if (sorting.order == 1) {
      direction = SortingDirection.Ascending;
    } else {
      direction = SortingDirection.Descending;
    }
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onSelectRow() {
    this.router.navigate([`/security/roles/${this.selectedData.name}`]);
  }

  private load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  private onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

}
