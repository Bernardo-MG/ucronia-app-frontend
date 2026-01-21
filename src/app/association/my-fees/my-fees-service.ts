import { Injectable, inject } from '@angular/core';
import { PaginatedResponse } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Fee } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MyFeesService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getAll(page: number | undefined = undefined): Observable<PaginatedResponse<Fee>> {
    return this.ucroniaClient.myFees.page(page);
  }

}
