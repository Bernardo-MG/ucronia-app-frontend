
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@bernardo-mg/authentication';
import { Setting } from '@ucronia/domain';
import { CardModule } from 'primeng/card';
import { finalize, forkJoin } from 'rxjs';
import { AssociationSettingsService } from '../association-settings-service';
import { SocialSettingsForm, SocialSettingsFormEvent } from '../social-settings-form/social-settings-form';

@Component({
  selector: 'assoc-settings-view',
  imports: [CardModule, ReactiveFormsModule, FormsModule, SocialSettingsForm],
  templateUrl: './settings-view.html'
})
export class SettingsView implements OnInit {

  private readonly service = inject(AssociationSettingsService);

  public settings: Setting[] = [];

  public readonly editable;

  public loading = false;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.editable = authService.hasPermission("association_settings", "update");
  }

  public ngOnInit(): void {
    this.service.getAll()
      .subscribe(response => this.settings = response);
  }

  public getSetting(code: string) {
    return this.settings.find(s => s.code === code)?.value ?? '';
  }

  public onSaveThirdPartySettings(values: SocialSettingsFormEvent) {
    this.loading = true;
    forkJoin({
      googleMaps: this.service.updateMap(values.googleMaps),
      teamUp: this.service.updateCalendar(values.teamUp),
      instagram: this.service.updateInstagram(values.instagram)
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe();
  }

  public onSaveMembershipSettings(values: { feeAmount: string }) {
    this.loading = true;
    this.service.updateFeeAmount(values.feeAmount)
      .pipe(finalize(() => this.loading = false))
      .subscribe();
  }

}
