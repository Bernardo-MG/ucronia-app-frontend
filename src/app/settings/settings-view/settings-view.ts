
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { ContactInfo } from '@ucronia/domain';
import { finalize, forkJoin } from 'rxjs';
import { AssociationSettingsService } from '../association-settings-service';
import { ContactSettingsForm, SocialSettingsFormEvent } from '../contact-settings-form/contact-settings-form';

@Component({
  selector: 'assoc-settings-view',
  imports: [ReactiveFormsModule, FormsModule, ContactSettingsForm],
  templateUrl: './settings-view.html'
})
export class SettingsView implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(AssociationSettingsService);

  public contactInfo = new ContactInfo();
  public readonly editable;
  public loading = false;

  public constructor() {
    const authService = inject(AuthService);

    // Check permissions
    // TODO: apply this permission
    this.editable = authService.hasPermission(UcroniaPermissions.associationSettings.update);
  }

  // Lifecycle hooks
  public ngOnInit(): void {
    this.loading = true;
    forkJoin({
      email: this.service.getEmail(),
      instagram: this.service.getInstagram(),
      map: this.service.getMap(),
      calendar: this.service.getCalendar(),
      telegram: this.service.getTelegram()
    })
      .pipe(
        finalize(() => this.loading = false),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(contactInfo => {
        this.contactInfo = contactInfo;
      });
  }

  // Event handlers
  public onSaveThirdPartySettings(values: SocialSettingsFormEvent) {
    const updates = [];

    if (values.email !== undefined) {
      updates.push(this.service.updateEmail(values.email));
    }

    if (values.instagram !== undefined) {
      updates.push(this.service.updateInstagram(values.instagram));
    }

    if (values.telegram !== undefined) {
      updates.push(this.service.updateTelegram(values.telegram));
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
        .pipe(
          finalize(() => this.loading = false),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    }
  }

}
