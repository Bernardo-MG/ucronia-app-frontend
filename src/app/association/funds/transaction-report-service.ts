import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionReportService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public downloadExcelReport(): Observable<any> {
    return this.ucroniaClient.transaction.excel();
  }

}
