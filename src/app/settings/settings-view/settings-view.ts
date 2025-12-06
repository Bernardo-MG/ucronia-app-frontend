
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CardModule } from 'primeng/card';
import { AssociationSettingsService } from '../association-settings-service';
import { SettingValuesEditor } from '../settings-values-editor/settings-values-editor';

@Component({
  selector: 'assoc-settings-view',
  imports: [CardModule, ReactiveFormsModule, FormsModule, SettingValuesEditor],
  templateUrl: './settings-view.html'
})
export class SettingsView implements OnInit {

  private readonly service = inject(AssociationSettingsService);

  public settings: Setting[] = [];

  public readonly editable;

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.editable = authContainer.hasPermission("association_settings", "update");
  }

  public ngOnInit(): void {
    this.service.getAll()
      .subscribe(response => this.settings = response);
  }

  public onSaveConfig(config: Setting) {
    return this.service.update(config.code, config).subscribe();
  }

}
