import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { BookLending } from '@ucronia/domain';

@Component({
  selector: 'assoc-library-lending-info',
  imports: [DatePipe, AuditInfo],
  templateUrl: './library-lending-info.html'
})
export class LibraryLendingInfo {

  public readonly lending = input.required<BookLending>();
  public readonly borrowerName = input('');

}
