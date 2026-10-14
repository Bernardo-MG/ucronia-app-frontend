import { Component, input, output } from '@angular/core';
import { ContactMethod } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-contact-method-list',
  imports: [ButtonModule, TableModule],
  templateUrl: './contact-method-list.html'
})
export class ContactMethodList {

  public readonly loading = input(false);
  public readonly data = input<ContactMethod[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  
  public readonly show = output<ContactMethod>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
