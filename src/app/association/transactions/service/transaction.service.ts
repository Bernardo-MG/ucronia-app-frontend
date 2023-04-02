import { Injectable } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { PaginatedResponse } from '@app/shared/api/models/paginated-response';
import { PaginationRequest } from '@app/shared/api/models/pagination-request';
import { Sort } from '@app/shared/api/models/sort';
import { CreateOperations } from '@app/shared/api/request/create-operations';
import { DeleteOperations } from '@app/shared/api/request/delete-operations';
import { ReadOperations } from '@app/shared/api/request/read-operations';
import { ReadPagedOperations } from '@app/shared/api/request/read-paged-operations';
import { RequestClient } from '@app/shared/api/request/request-client';
import { UpdateOperations } from '@app/shared/api/request/update-operations';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { TransactionFilter } from '../models/transaction-filter';

@Injectable()
export class TransactionService {

  private transactionUrl = environment.apiUrl + "/transaction";

  private transactionRangeUrl = environment.apiUrl + "/transaction/range";

  constructor(
    private client: RequestClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined, filter: TransactionFilter): Observable<PaginatedResponse<Transaction[]>> {
    const clt: ReadPagedOperations<Transaction> = this.client.readPaged(this.transactionUrl);
    if (pagination) {
      clt.page(pagination);
      if (pagination.sort) {
        clt.sort(pagination.sort);
      }
    }
    if (filter.startDate) {
      clt.parameter("startDate", filter.startDate);
    }
    if (filter.endDate) {
      clt.parameter("endDate", filter.endDate);
    }
    if (filter.date) {
      clt.parameter("date", filter.date);
    }

    const sort = new Sort<Transaction>('date');
    sort.order = 'desc';
    clt.sort([sort]);

    return clt.fetch();
  }

  public create(data: Transaction): Observable<Transaction> {
    const clt: CreateOperations<Transaction> = this.client.create(this.transactionUrl);
    return clt.body(data).push().pipe(map(r => r.content));
  }

  public update(id: number, data: Transaction): Observable<Transaction> {
    const clt: UpdateOperations<Transaction> = this.client.update(this.transactionUrl);
    return clt.id(id).body(data).push().pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Transaction> {
    const clt: DeleteOperations<Transaction> = this.client.delete(this.transactionUrl);
    return clt.id(id).push().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Transaction> {
    const clt: ReadOperations<Transaction> = this.client.read(this.transactionUrl + `/${id}`);
    return clt.fetchOne().pipe(map(r => r.content));
  }

  public getRange(): Observable<TransactionCalendarRange> {
    const clt: ReadPagedOperations<TransactionCalendarRange> = this.client.readPaged(this.transactionRangeUrl);

    return clt.fetchOne().pipe(map(r => r.content));
  }

}
