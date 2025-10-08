import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionReportService {
  private http = inject(HttpClient);


  public downloadExcelReport(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.ms-excel'
    });

    return this.http.get(`${environment.apiUrl}/funds/transaction`, {
      headers,
      responseType: 'blob'
    }).pipe(
      map((response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'transactions.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
      })
    );
  }

}
