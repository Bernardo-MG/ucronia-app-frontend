import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionReportService {

  constructor(private http: HttpClient) { }

  downloadTransactionFile(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.ms-excel' // Request Excel response
    });

    return this.http.get(`${environment.apiUrl}/funds/transaction`, {
      headers,
      responseType: 'blob',  // Blob type to handle Excel files
      observe: 'response'   // So we can inspect the headers
    }).pipe(
      map((response: HttpResponse<Blob>) => {
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/vnd.ms-excel')) {
          // It's an Excel file, trigger the download
          const blob = new Blob([response.body!], { type: 'application/vnd.ms-excel' });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'transactions.xlsx';  // You can change the filename
          anchor.click();
          window.URL.revokeObjectURL(url);  // Clean up URL object
        } else {
          // Handle JSON response
          const reader = new FileReader();
          reader.onloadend = () => {
            const jsonResponse = JSON.parse(reader.result as string);
            console.log(jsonResponse); // Do something with the JSON response
          };
          reader.readAsText(response.body!);  // Convert Blob to JSON string
        }
      })
    );
  }

}
