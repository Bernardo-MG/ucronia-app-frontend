import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { EditionWrapperComponent } from '@app/shared/layout/components/edition-wrapper/edition-wrapper.component';
import { Observable } from 'rxjs';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MemberInfoComponent } from '../member-info/member-info.component';

@Component({
  selector: 'assoc-member-info-editor',
  standalone: true,
  imports: [MemberFormComponent, MemberInfoComponent, ArticleComponent, EditionWrapperComponent],
  templateUrl: './member-info-editor.component.html'
})
export class MemberInfoEditorComponent extends InfoEditorComponent<Member> implements OnInit {

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

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate([`/membership`]);
    });
  }

  protected override read(): Observable<Member> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Member): Observable<Member> {
    return this.service.update(this.data.number, toSave);
  }

}
