import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/api/models/api-response';
import { CreateOperations } from '@app/api/request/create-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { Fee } from '@app/models/fee';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminFeeService {

  private feeUrl = environment.apiUrl + "/fee";

  constructor(
    private client: RequestClient
  ) { }

  public getAll(): Observable<Fee[]> {
    const clt: ReadOperations<Fee> = this.client.read(this.feeUrl);
    return clt.fetchUnwrapped();
  }

  public create(fee: Fee): Observable<Fee> {
    const clt: CreateOperations<Fee> = this.client.create(this.feeUrl);
    return clt.body(fee).pushUnwrapped();
  }

}
