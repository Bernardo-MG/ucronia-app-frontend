import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Member } from "@app/association/models/member";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { environment } from "environments/environment";
import { AngularCreateOperations } from "./angular-create-operations";
import { AngularDeleteOperations } from "./angular-delete-operations";
import { AngularReadOperations } from "./angular-read-operations";
import { AngularUpdateOperations } from "./angular-update-operations";
import { CreateOperations } from "./create-operations";
import { DeleteOperations } from "./delete-operations";
import { BalanceQuery } from "./query/balance-query";
import { CrudQuery } from "./query/crud-query";
import { FeeCalendarQuery } from "./query/fee-calendar-query";
import { FeeQuery } from "./query/fee-query";
import { TransactionQuery } from "./query/transaction-query";
import { TransactionRangeQuery } from "./query/transaction-range-query";
import { UpdateOperations } from "./update-operations";

@Injectable({
  providedIn: 'root'
})
export class AssociationApiClient {

  private rootUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public balance(): BalanceQuery {
    return new BalanceQuery(this.getReadOperations());
  }

  public fee(): FeeQuery {
    return new FeeQuery(this.getCreateOperations(), this.getReadOperations(), this.getUpdateOperations(), this.getDeleteOperations());
  }

  public feeCalendar(): FeeCalendarQuery {
    return new FeeCalendarQuery(this.getReadOperations());
  }

  public member(): CrudQuery<Member> {
    return new CrudQuery<Member>(this.http, this.rootUrl + '/member');
  }

  public transaction(): TransactionQuery {
    return new TransactionQuery(this.getCreateOperations(), this.getReadOperations(), this.getUpdateOperations(), this.getDeleteOperations());
  }

  public transactionRange(): TransactionRangeQuery {
    return new TransactionRangeQuery(this.getReadOperations());
  }

  private getReadOperations(): ReadOperations {
    return new AngularReadOperations(this.http, this.rootUrl);
  }

  private getCreateOperations(): CreateOperations {
    return new AngularCreateOperations(this.http, this.rootUrl);
  }

  private getUpdateOperations(): UpdateOperations {
    return new AngularUpdateOperations(this.http, this.rootUrl);
  }

  private getDeleteOperations(): DeleteOperations {
    return new AngularDeleteOperations(this.http, this.rootUrl);
  }

}