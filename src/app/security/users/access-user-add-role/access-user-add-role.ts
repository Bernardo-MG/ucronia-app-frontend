
import { Component, input, output } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'access-user-add-role',
  imports: [TableModule, IconAddComponent],
  templateUrl: './access-user-add-role.html'
})
export class AccessUserAddRole {

  public readonly roles = input(new PaginatedResponse<Role>());

  public readonly loading = input(false);

  public readonly addRole = output<Role>();

  public readonly goToPage = output<number>();

  public get first() {
    return (this.roles().page - 1) * this.roles().size;
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.roles().size) + 1;
    this.goToPage.emit(page);
  }

  public onAdd(data: Role): void {
    this.addRole.emit(data);
  }

  public onGoToPage(page: number): void {
    this.goToPage.emit(page);
  }

}
