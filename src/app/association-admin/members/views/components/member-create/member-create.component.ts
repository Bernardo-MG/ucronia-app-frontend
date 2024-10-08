import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberFormComponent } from '@app/association-admin/members/core/components/member-form/member-form.component';
import { MemberService } from '@app/association-admin/members/core/services/member.service';
import { Member } from '@app/models/members/member';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'assoc-member-create',
  standalone: true,
  imports: [CardModule, MemberFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './member-create.component.html'
})
export class MemberCreateComponent extends CreateComponent<Member> {

  constructor(
    private service: MemberService,
    rtr: Router,
    rt: ActivatedRoute
  ) {
    super(rtr, rt);
  }

  protected override save(toSave: Member): Observable<Member> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Member): string {
    return '..';
  }

}
