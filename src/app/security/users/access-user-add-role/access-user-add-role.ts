
import { Component, input, OnInit, output } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { TableModule, TablePageEvent } from 'primeng/table';
import { EMPTY, finalize, Observable } from 'rxjs';

@Component({
  selector: 'access-user-add-role',
  imports: [TableModule, IconAddComponent],
  templateUrl: './access-user-add-role.html'
})
export class AccessUserAddRole implements OnInit {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Role>>>((page: number) => EMPTY);

  public readonly addRole = output<Role>();

  public selection = new PaginatedResponse<Role>();
  public loading = false;

  public get first() {
    return (this.selection.page - 1) * this.selection.size;
  }

  public ngOnInit(): void {
    this.onGoToPage(0);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.selection.size) + 1;
    this.onGoToPage(page);
  }

  public onAdd(data: Role): void {
    this.addRole.emit(data);
  }

  private onGoToPage(page: number): void {
    this.loading = true;
    this.getSelection()(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.selection = response);
  }

}
