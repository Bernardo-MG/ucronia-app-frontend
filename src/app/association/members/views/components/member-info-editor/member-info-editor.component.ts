import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberFormComponent } from '@app/association/members/core/components/member-form/member-form.component';
import { MemberInfoComponent } from '@app/association/members/core/components/member-info/member-info.component';
import { MemberService } from '@app/association/members/core/services/member.service';
import { Member } from '@app/association/members/shared/models/member';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'assoc-member-info-editor',
  standalone: true,
  imports: [CommonModule, CardModule, MemberFormComponent, MemberInfoComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './member-info-editor.component.html'
})
export class MemberInfoEditorComponent extends InfoEditorStatusComponent<Member> implements OnInit {

  public view: string = 'details';

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MemberService,
    private authContainer: AuthContainer
  ) {
    super(new Member());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("member", "update");
    this.deletable = this.authContainer.hasPermission("member", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const numParam = params.get('number');
      if (numParam) {
        this.number = Number(numParam);
      }
      this.load();
    });
  }

  public onActivate() {
    const user = this.data;
    user.active = true;
    this.onSave(user);
  }

  public onDeactivate() {
    const user = this.data;
    user.active = false;
    this.onSave(user);
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate([`/members`]);
    });
  }

  protected override read(): Observable<Member> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Member): Observable<Member> {
    return this.service.update(this.data.number, toSave);
  }

}
