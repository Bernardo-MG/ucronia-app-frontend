import { MemberQuery } from "./query/member-query";


export interface AssociationApiClient {
  
  member(): MemberQuery;

}