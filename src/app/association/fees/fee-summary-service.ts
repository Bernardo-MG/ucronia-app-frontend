import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { FeeSummary } from '@ucronia/domain';
import { endOfMonth, startOfMonth } from 'date-fns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeSummaryService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getSummary(): Observable<FeeSummary> {
    const now = new Date();
    const from = startOfMonth(now);
    const to = endOfMonth(now);

    return this.ucroniaClient.fee.summary(from, to);
  }

}
