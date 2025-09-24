import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserTokenService } from '@app/security/user-tokens/user-token-service';
import { AuthContainer, UserToken } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize } from 'rxjs';
import { UserTokenInfo } from '../user-token-info/user-token-info';
import { UserTokenStatus } from '../user-token-status/user-token-status';

@Component({
  selector: 'access-user-token-list',
  imports: [CardModule, TableModule, DrawerModule, ButtonModule, MenuModule, UserTokenInfo, UserTokenStatus, DatePipe],
  templateUrl: './user-token-list.html'
})
export class UserTokenList implements OnInit {

  private readonly router = inject(Router);
  private readonly service = inject(UserTokenService);

  public readonly editionMenuItems: MenuItem[] = [];

  @ViewChild('editionMenu') editionMenu!: Menu;

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<UserToken>();

  public selectedData = new UserToken();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;
  public showing = false;
  public editing = false;

  public readonly editable;

  public view: string = '';

  public constructor() {
    const authContainer = inject(AuthContainer);

    this.editable = authContainer.hasPermission("user_token", "update");

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Datos',
        command: () => this.onStartEditingView('details')
      });
    this.editionMenuItems.push(
      {
        label: 'Extender expiración',
        command: () => this.onStartEditingView('details')
      });
    this.editionMenuItems.push(
      {
        label: 'Revocar',
        command: () => this.onStartEditingView('details')
      });
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public onShowInfo(token: UserToken) {
    this.selectedData = token;
    this.showing = true;
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
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
    this.router.navigate([`/security/user-tokens/${this.selectedData.token}`]);
  }

  private load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
