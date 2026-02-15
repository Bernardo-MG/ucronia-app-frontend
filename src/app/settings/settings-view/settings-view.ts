
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@bernardo-mg/authentication';
import { CardModule } from 'primeng/card';
import { finalize, forkJoin } from 'rxjs';
import { AssociationSettingsService } from '../association-settings-service';
import { ContactSettingsForm, SocialSettingsFormEvent } from '../contact-settings-form/contact-settings-form';

@Component({
  selector: 'assoc-settings-view',
  imports: [CardModule, ReactiveFormsModule, FormsModule, ContactSettingsForm],
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
    // TODO: apply this permission
    this.editable = authService.hasPermission("association_settings", "update");
  }

  public ngOnInit(): void {
    this.loading = true;
    forkJoin({
      googleMaps: this.service.getMap(),
      teamUp: this.service.getCalendar(),
      instagram: this.service.getInstagram()
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe(r => {
        this.map = r.googleMaps.value;
        this.calendar = r.teamUp.value;
        this.instagram = r.instagram.value;
      });
  }

  public onSaveThirdPartySettings(values: SocialSettingsFormEvent) {
    const updates = [];

    if (values.email !== undefined) {
      updates.push(this.service.updateEmail(values.email));
    }

    if (values.instagram !== undefined) {
      updates.push(this.service.updateInstagram(values.instagram));
    }

    if (values.googleMaps !== undefined) {
      updates.push(this.service.updateMap(values.googleMaps));
    }

    if (values.teamUp !== undefined) {
      updates.push(this.service.updateCalendar(values.teamUp));
    }

    if (updates.length > 0) {
      this.loading = true;

      forkJoin(updates)
        .pipe(finalize(() => this.loading = false))
        .subscribe();
    }
  }

}
