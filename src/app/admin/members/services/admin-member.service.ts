import { Injectable } from '@angular/core';
import { Member } from '@app/models/member';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMemberService {

  constructor() { }

  public getMembers(): Observable<Member[]> {
    const members = [];
    let member: Member;

    member = new Member();
    member.id = 1;
    member.name = 'Member 1';
    members.push(member);

    member = new Member();
    member.id = 2;
    member.name = 'Member 2';
    members.push(member);

    member = new Member();
    member.id = 3;
    member.name = 'Member 3';
    members.push(member);

    member = new Member();
    member.id = 4;
    member.name = 'Member 4';
    members.push(member);

    member = new Member();
    member.id = 5;
    member.name = 'Member 5';
    members.push(member);

    return of(members);
  }

  public getMember(id: number): Observable<Member> {
    const member = new Member();
    member.id = 1;
    member.name = 'Member 1';

    return of(member);
  }

  public create(member: Member) {
    
  }

}
