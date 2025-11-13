
import { Component, input, OnInit, output } from '@angular/core';
import { PublicMember } from '@app/domain/members/public-member';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { EMPTY, finalize, Observable } from 'rxjs';

@Component({
  selector: 'access-user-select-member',
  imports: [ButtonModule, TableModule],
  templateUrl: './access-user-select-member.html'
})
export class AccessUserSelectMember implements OnInit {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<PublicMember>>>((page: number) => EMPTY);

  public readonly selectMember = output<PublicMember>();

  public selection = new PaginatedResponse<PublicMember>();
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

  public onSelect(data: PublicMember): void {
    this.selectMember.emit(data);
  }

  private onGoToPage(page: number): void {
    this.loading = true;
    this.getSelection()(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.selection = response);
  }

}
