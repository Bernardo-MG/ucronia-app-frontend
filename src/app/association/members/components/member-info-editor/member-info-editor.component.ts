import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/layout/components/info-editor/info-editor.component';
import { Observable } from 'rxjs';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-info-editor',
  templateUrl: './member-info-editor.component.html'
})
export class MemberInfoEditorComponent extends InfoEditorComponent<Member> implements OnInit {

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
      this.load(params.get('number'));
    });
  }

  protected save(toSave: Member): Observable<Member>{
    return this.service.update(this.data.number, toSave);
  }

  public onDelete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate([`/membership`]);
    });
  }

  private load(id: string | null): void {
    if (id) {
      this.reading = true;
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe({
          next: d => {
            this.data = d;
            this.reading = false;
          },
          error: error => {
            this.reading = false;
            this.error = true;
          }
        });
    }
  }

}
