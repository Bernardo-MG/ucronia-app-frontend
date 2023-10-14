import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Failure } from '@app/core/api/models/failure';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-details',
  templateUrl: './transaction-details.component.html'
})
export class TransactionDetailsComponent implements OnInit {

  /**
   * Reading flag.
   */
  public reading = false;

  /**
   * Saving flag.
   */
  public saving = false;

  public editing = false;

  public editable = false;

  public deletable = false;

  public error = false;

  public data = new Transaction();

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransactionService,
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("transaction", "update");
    this.deletable = this.authContainer.hasPermission("transaction", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(toSave: Transaction): void {
    this.saving = true;
    this.service.update(toSave.id, toSave).subscribe({
      next: d => {
        this.data = d;

        this.failures = {};
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
        this.editing = false;
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.data.id).subscribe(r => {
      this.router.navigate([`/funds`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  public isAbleToEdit() {
    return (!this.error) && (!this.reading) && this.editable && !this.editing;
  }

  public isAbleToDelete() {
    return (!this.error) && (!this.reading) && this.deletable && (!this.editing);
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

  public isEditable() {
    return this.editable && this.editing && (!this.error);
  }

  public isWaiting() {
    return this.reading || this.saving;
  }

}
