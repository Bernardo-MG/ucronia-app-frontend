import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from 'projects/ucronia/api/src/lib/api/ucronia-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookReportService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public downloadExcelReport(): Observable<any> {
    return this.ucroniaClient.library.report.excel();
  }

}
