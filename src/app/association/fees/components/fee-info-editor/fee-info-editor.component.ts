import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FailureResponse } from '@app/core/api/models/failure-response';
import { FieldFailures } from '@app/core/api/models/field-failures';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { Fee } from '../../models/fee';
import { FeeService } from '../../services/fee.service';
import { InfoEditorComponent } from '@app/shared/layout/components/info-editor/info-editor.component';

@Component({
  selector: 'assoc-fee-info-editor',
  templateUrl: './fee-info-editor.component.html'
})
export class FeeInfoEditorComponent extends InfoEditorComponent<Fee> implements OnInit, AfterContentInit {

  private date: string = "";

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
      this.load(params.get('memberNumber'));
    });
  }

  protected override save(toSave: Fee): Observable<Fee> {
    return this.service.update(this.data.date, this.data.member.number, toSave);
  }

  public onDelete(): void {
    this.service.delete(this.data.date, this.data.member.number).subscribe(r => {
      this.router.navigate([`/membership`]);
    });
  }

  protected read(id: string) {
    const identifier = Number(id);
    return this.service.getOne(this.date, identifier);
  }

  public goToTransaction(index: number) {
    this.router.navigate([`funds/transaction/${index}`]);
  }

}
