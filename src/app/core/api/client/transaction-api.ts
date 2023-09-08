import { HttpClient } from "@angular/common/http";
import { Transaction } from "@app/association/models/transaction";
import { environment } from "environments/environment";
import { AngularRequest } from "../repository/angular-request";
import { CrudRepository } from "../repository/crud-repository";

export class TransactionApi extends CrudRepository<Transaction> {
    
  constructor(
    private http: HttpClient
  ) { 
    super(() => new AngularRequest(this.http, environment.apiUrl + '/transaction'))
  }

}