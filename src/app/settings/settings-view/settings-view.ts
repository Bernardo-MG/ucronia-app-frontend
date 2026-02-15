
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@bernardo-mg/authentication';
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

  public map = '';
  public calendar = '';
  public instagram = '';

  public readonly editable;
  public loading = false;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.editable = authService.hasPermission("association_settings", "update");
  }

  public ngOnInit(): void {
    this.service.getMap()
      .subscribe(map => this.map = map.value);
    this.service.getCalendar()
      .subscribe(calendar => this.calendar = calendar.value);
    this.service.getInstagram()
      .subscribe(instagram => this.instagram = instagram.value);
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
