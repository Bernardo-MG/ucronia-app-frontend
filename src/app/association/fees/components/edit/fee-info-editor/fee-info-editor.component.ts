import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { EditionWrapperComponent } from '@app/shared/form/components/edition-wrapper/edition-wrapper.component';
import { Observable } from 'rxjs';
import { Fee } from '../../../models/fee';
import { FeeService } from '../../../services/fee.service';
import { FeeEditFormComponent } from '../fee-edit-form/fee-edit-form.component';
import { FeeInfoComponent } from '../fee-info/fee-info.component';

@Component({
  selector: 'assoc-fee-info-editor',
  standalone: true,
  imports: [CommonModule, FeeEditFormComponent, FeeInfoComponent, ArticleComponent, EditionWrapperComponent],
  templateUrl: './fee-info-editor.component.html'
})
export class FeeInfoEditorComponent extends InfoEditorComponent<Fee> implements OnInit, AfterContentInit {

  private date: string = "";

  private memberNumber = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FeeService,
    private cdRef: ChangeDetectorRef,
    private authContainer: AuthContainer
  ) {
    super(new Fee());
  }

  public ngAfterContentInit(): void {
    // TODO: What is this for?
    this.cdRef.detectChanges();
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("fee", "update");
    this.deletable = this.authContainer.hasPermission("fee", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const dateParam = params.get('date');
      if(dateParam){
        this.date = dateParam;
      } else {
        this.date = '';
      }
      const memberNumberParam = params.get('memberNumber');
      if(memberNumberParam){
        this.memberNumber = Number(memberNumberParam);
      }
      this.load();
    });
  }

  public goToTransaction(index: number) {
    this.router.navigate([`funds/transaction/${index}`]);
  }

  protected override delete(): void {
    this.service.delete(this.data.date, this.data.member.number).subscribe(r => {
      this.router.navigate([`/fees`]);
    });
  }

  protected override read(): Observable<Fee> {
    return this.service.getOne(this.date, this.memberNumber);
  }

  protected override save(toSave: Fee): Observable<Fee> {
    return this.service.update(this.data.date, this.data.member.number, toSave);
  }

}
