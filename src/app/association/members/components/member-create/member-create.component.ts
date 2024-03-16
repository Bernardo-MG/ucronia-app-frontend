import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { Observable } from 'rxjs';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-create',
  templateUrl: './member-create.component.html'
})
export class MemberCreateComponent extends CreateComponent<Member> {

  constructor(
    private service: MemberService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: Member): Observable<Member> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Member): string {
    return `/membership/member/${saved.number}`;
  }

}
