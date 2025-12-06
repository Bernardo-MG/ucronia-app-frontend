
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '@app/settings/models/setting';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CardModule } from 'primeng/card';
import { finalize, forkJoin } from 'rxjs';
import { AssociationSettingsService } from '../association-settings-service';
import { MembershipSettingsForm } from '../membership-settings-form/membership-settings-form';
import { ThirdPartySettingsForm } from '../third-party-settings-form/third-party-settings-form';

@Component({
  selector: 'assoc-settings-view',
  imports: [CardModule, ReactiveFormsModule, FormsModule, ThirdPartySettingsForm, MembershipSettingsForm],
  templateUrl: './settings-view.html'
})
export class SettingsView implements OnInit {

  private readonly service = inject(AssociationSettingsService);

  public settings: Setting[] = [];

  public readonly editable;

  public loading = false;

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

  public onSaveThirdPartySettings(values: { googleMaps: string, teamUp: string }) {
    const googleMapsSetting = {
      value: values.googleMaps
    };
    const teamUpSetting = {
      value: values.teamUp
    };
    this.loading = true;
    forkJoin({
      googleMaps: this.service.update("social.googleMap.id", googleMapsSetting),
      teamUp: this.service.update("social.teamup.id", teamUpSetting)
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe();
  }

  public onSaveMembershipSettings(values: { feeAmount: string }) {
    const feeAmountSetting = {
      value: values.feeAmount
    };
    this.loading = true;
    forkJoin({
      googleMaps: this.service.update("fee.amount", feeAmountSetting)
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe();
  }

}
