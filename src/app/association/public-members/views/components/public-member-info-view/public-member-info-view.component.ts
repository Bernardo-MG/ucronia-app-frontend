import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicMemberInfoComponent } from '@app/association/public-members/core/components/public-member-info/public-member-info.component';
import { PublicMemberService } from '@app/association/public-members/core/services/public-member.service';
import { PublicMember } from '@app/models/members/public-member';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'assoc-member-info-editor',
  standalone: true,
  imports: [CommonModule, CardModule, ArticleComponent, PublicMemberInfoComponent, ResponsiveShortColumnsDirective],
  templateUrl: './public-member-info-view.component.html'
})
export class PublicMemberInfoEditorComponent extends InfoEditorStatusComponent<PublicMember> implements OnInit {

  public view: string = 'details';

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private service: PublicMemberService,
    private authContainer: AuthContainer
  ) {
    super(new PublicMember());
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
    throw new Error('Method not implemented.');
  }

  protected override read(): Observable<PublicMember> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: PublicMember): Observable<PublicMember> {
    throw new Error('Method not implemented.');
  }

}
