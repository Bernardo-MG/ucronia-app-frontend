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
      this.load(params.get('date'), params.get('memberNumber'));
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

  private load(date: string | null, memberNumber: string | null): void {
    if (date && memberNumber) {
      this.reading = true;
      const identifier = Number(memberNumber);
      this.service.getOne(date, identifier)
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

  public goToTransaction(index: number) {
    this.router.navigate([`funds/transaction/${index}`]);
  }

}
