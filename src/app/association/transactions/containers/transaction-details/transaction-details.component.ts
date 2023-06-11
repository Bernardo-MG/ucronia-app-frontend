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

  public editable = false;

  public deletable = false;

  public formValid = false;

  public data: Transaction = new Transaction();

  public failures: Map<string, Failure[]> = new Map<string, Failure[]>();

  public form: FormGroup;

  public valid = false;

  public editing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransactionService,
    private authService: AuthService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      id: [-1],
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [0, Validators.required]
    });
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authService.hasPermission("transaction", "update");
    this.deletable = this.authService.hasPermission("transaction", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });

    // Listen for status changes
    this.form.statusChanges.subscribe(status => {
      this.valid = (status === "VALID");
    });
  }

  public onSave(): void {
    const data: Transaction = this.form.value;
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
    const data: Transaction = this.form.value;
    this.service.delete(data.id).subscribe(r => {
      this.router.navigate([`/transactions/list`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  private load(id: string | null): void {
    if (id) {
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.data = d;
          this.form.patchValue(this.data);
        });
    }
  }

  public isEditable() {
    return this.editable && this.editing;
  }

  public isSaveDisabled() {
    return !this.editable || !this.editing || !this.isAbleToSave();
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

  public isAbleToEdit() {
    return !this.saving && this.editable && this.editing;
  }

  public isAbleToDelete() {
    return !this.saving && this.deletable && !this.editing;
  }

}
