import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ProfileDetails } from '../model/profile-info';

@Component({
  selector: 'assoc-profile-info',
  imports: [CommonModule, SkeletonModule, CardModule, DetailField, DatePipe],
  templateUrl: './profile-info.html'
})
export class ProfileInfo {

  public data = input(new ProfileDetails());
  public loading = input(false);

  public get isMember(): boolean {
    return this.data().types.includes('member');
  }

  public get isGuest(): boolean {
    return this.data().types.includes('guest');
  }

  public get isSponsor(): boolean {
    return this.data().types.includes('sponsor');
  }

}
