
import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Contact } from '@app/domain/contact/contact';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-contact-info',
  imports: [CommonModule, SkeletonModule, DatePipe],
  templateUrl: './contact-info.html'
})
export class ContactInfo {

  public readonly data = input(new Contact());
  public readonly loading = input(false);

  public get isMember() {
    return this.data().membership !== null;
  }

  public get isActive() {
    return this.data().membership?.active;
  }

  public get isRenewed() {
    return this.data().membership?.renew;
  }

}
