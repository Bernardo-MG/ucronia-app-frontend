import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';

@Component({
  selector: 'assoc-fee-form',
  templateUrl: './fee-form.component.html',
  styleUrls: ['./fee-form.component.sass']
})
export class FeeFormComponent {

  @Input() public readonly = false;

  @Input() public form: FormGroup = this.fb.group({});

  @Input() public failures: Map<string, Failure[]> = new Map<string, Failure[]>();
  
  @Output() public save = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder
  ) { }

  public onSave(){
    this.save.emit();
  }
  
  public isInvalid(property: string): boolean {
    return (this.form.get(property)?.invalid) || (this.failures.has(property));
  }

  public getFailures(property: string): Failure[] {
    let failures: Failure[];

    const found = this.failures.get(property);
    if (found) {
      failures = (found as Failure[]);
    } else {
      failures = [];
    }

    return failures;
  }

}
