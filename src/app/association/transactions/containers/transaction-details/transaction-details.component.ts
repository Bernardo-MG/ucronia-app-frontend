import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-details',
  templateUrl: './transaction-details.component.html'
})
export class TransactionDetailsComponent implements OnInit {

  /**
   * Saving flag.
   */
  public saving = false;

  public valid = false;

  public editing = false;

  public editPermission = false;

  public deletePermission = false;

  public data = new Transaction();

  public failures = new Map<string, Failure[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransactionService,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.editPermission = this.authService.hasPermission("transaction", "update");
    this.deletePermission = this.authService.hasPermission("transaction", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSaveCurrent(): void {
    this.onSave(this.data);
  }

  public onSave(data: Transaction): void {
    this.saving = true;
    this.service.update(data.id, data).subscribe({
      next: d => {
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
        this.editing = false;
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.data.id).subscribe(r => {
      this.router.navigate([`/members/list`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public onChange(changed: Transaction) {
    this.data = changed;
  }

  public onValidityChange(valid: boolean) {
    this.valid = valid;
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.data = d;
        });
    }
  }

  public isEditable() {
    return this.editPermission && this.editing;
  }

}
