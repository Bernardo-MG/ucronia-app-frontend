
import { Component, input, output } from '@angular/core';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { PaginatedResponse, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'access-role-add-permission',
  imports: [TableModule, ButtonModule],
  templateUrl: './access-role-add-permission.html'
})
export class AccessRoleAddPermission {

  public readonly permissions = input(new PaginatedResponse<ResourcePermission>());
  public readonly loading = input(false);

  public readonly addPermission = output<ResourcePermission>();
  public readonly goTo = output<number>();
  public readonly changeDirection = output<SortingProperty>();

  public get first() {
    return (this.permissions().page - 1) * this.permissions().size;
  }

  public data = new ResourcePermission();

  public onAddPermission(permission: ResourcePermission): void {
    this.addPermission.emit(permission);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.permissions().size) + 1;
    this.goTo.emit(page);
  }

  public onGoTo(page: number) {
    this.goTo.emit(page);
  }

  public onChangeDirection(field: SortingProperty) {
    this.changeDirection.emit(field);
  }

}
