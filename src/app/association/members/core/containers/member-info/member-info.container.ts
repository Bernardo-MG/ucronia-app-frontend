import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberDetailsComponent } from '@app/association/members/core/components/member-details/member-details.component';
import { MemberService } from '@app/association/members/core/services/member.service';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Member } from '@app/models/members/member';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ArticleComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';

@Component({
    selector: 'assoc-member-info',
    imports: [CommonModule, ArticleComponent, MemberDetailsComponent, ResponsiveShortColumnsDirective],
    templateUrl: './member-info.container.html'
})
export class MemberInfoContainer extends InfoEditorStatusComponent<Member> implements OnInit {

  public view: string = 'details';

  private number = -1;

  constructor(
    private route: ActivatedRoute,
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

  public onChangeView(newView: string) {
    this.view = newView;
  }

  protected override delete(): void {
    throw new Error('Method not implemented.');
  }

  protected override read(): Observable<Member> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Member): Observable<Member> {
    throw new Error('Method not implemented.');
  }

}
