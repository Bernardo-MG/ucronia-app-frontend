import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { Sort } from '@app/api/models/sort';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { RoutePaginationObserver } from '@app/api/route/observer/route-pagination-observer';
import { Transaction } from '@app/models/transaction';
import { environment } from 'environments/environment';
import { EMPTY, empty, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionUrl = environment.apiUrl + "/transaction";

  private routePaginationObserver: RoutePaginationObserver;

  constructor(
    private client: RequestClient,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationObserver(route);
  }

  public getAll(): Observable<PaginatedResponse<Transaction[]>> {
    // Listens for changes on pagination params and reads again
    return this.routePaginationObserver.pagination.pipe(mergeMap(p => this.read(p)));
  }

  public create(member: Transaction): Observable<Transaction> {
    const clt: CreateOperations<Transaction> = this.client.create(this.transactionUrl);
    return clt.body(member).pushUnwrapped();
  }

  public update(id: number, member: Transaction): Observable<Transaction> {
    const clt: UpdateOperations<Transaction> = this.client.update(this.transactionUrl);
    return clt.id(id).body(member).pushUnwrapped();
  }

  public delete(id: number): Observable<Transaction> {
    const clt: DeleteOperations<Transaction> = this.client.delete(this.transactionUrl);
    return clt.id(id).pushUnwrapped();
  }

  public getOne(id: number): Observable<Transaction> {
    const clt: ReadOperations<Transaction> = this.client.read(this.transactionUrl + `/${id}`);
    return clt.fetchOneUnwrapped();
  }

  private read(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Transaction[]>> {
    const clt: ReadOperations<Transaction> = this.client.read(this.transactionUrl);
    if (pagination) {
      clt.page(pagination);
      if (pagination.sort) {
        clt.sort(pagination.sort);
      }
    }
    return clt.fetchPaged();
  }

}
