import { FeeQuery } from "./query/fee-query";
import { MemberQuery } from "./query/member-query";
import { TransactionQuery } from "./query/transaction-query";
import { TransactionRangeQuery } from "./query/transaction-range-query";


export interface AssociationApiClient {

  fee(): FeeQuery;
  
  member(): MemberQuery;
  
  transaction(): TransactionQuery;
  
  transactionRange(): TransactionRangeQuery;

}