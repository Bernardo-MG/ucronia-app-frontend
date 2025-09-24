
import { Component, input, OnInit, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { TableModule, TablePageEvent } from 'primeng/table';
import { EMPTY, finalize, Observable } from 'rxjs';

@Component({
  selector: 'access-user-select-member',
  imports: [TableModule, IconAddComponent],
  templateUrl: './access-user-select-member.html'
})
export class AccessUserSelectMember implements OnInit {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Member>>>((page: number) => EMPTY);

  public readonly selectMember = output<Member>();

  public selection = new PaginatedResponse<Member>();
  public loading = false;

  public ngOnInit(): void {
    this.onGoToPage(0);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.selection.size) + 1;
    this.onGoToPage(page);
  }

  public get first() {
    return (this.selection.page - 1) * this.selection.size;
  }

  public onSelect(data: Member): void {
    this.selectMember.emit(data);
  }

  private onGoToPage(page: number): void {
    this.loading = true;
    this.getSelection()(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.selection = response);
  }

}
