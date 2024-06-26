import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { Observable } from 'rxjs';
import { Member } from '../../../models/member';
import { MemberService } from '../../../services/member.service';
import { MemberFormComponent } from '../../data/member-form/member-form.component';
import { MemberInfoComponent } from '../../data/member-info/member-info.component';

@Component({
  selector: 'assoc-member-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, MemberFormComponent, MemberInfoComponent, ArticleComponent, WaitingButtonComponent],
  templateUrl: './member-info-editor.component.html'
})
export class MemberInfoEditorComponent extends InfoEditorStatusComponent<Member> implements OnInit {

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
