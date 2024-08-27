import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberFormComponent } from '@app/association/members/core/components/member-form/member-form.component';
import { MemberService } from '@app/association/members/core/services/member.service';
import { Member } from '@app/association/members/shared/models/member';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'assoc-member-create',
  standalone: true,
  imports: [MemberFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
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
    return '/members';
  }

}
