import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Failure } from '@app/core/api/models/failure';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { FormType } from '@app/shared/edition/models/form-type';

@Component({
  selector: 'access-user-form',
  templateUrl: './access-user-form.component.html'
})
export class AccessUserFormComponent {

  @Input() public data: any;

  @Input() public failures: Failure[] = [];

  @Input() public saving = false;

  @Output() public save = new EventEmitter<any>();

  public fields: FormDescription[] = [
    new FormDescription('Username', 'username', FormType.string, Validators.required),
    new FormDescription('Name', 'name', FormType.string, Validators.required),
    new FormDescription('Email', 'email', FormType.string, Validators.required),
    new FormDescription('Credentials expired', 'credentialsExpired', FormType.boolean, Validators.required),
    new FormDescription('Enabled', 'enabled', FormType.boolean, Validators.required),
    new FormDescription('Expired', 'expired', FormType.boolean, Validators.required),
    new FormDescription('Locked', 'locked', FormType.boolean, Validators.required)
  ];

  public onSave(data: any): void {
    this.save.emit(data);
  }

}
