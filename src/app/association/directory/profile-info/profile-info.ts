import { CommonModule, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { FullProfile } from '../model/full-profile';

@Component({
  selector: 'assoc-profile-info',
  imports: [CommonModule, SkeletonModule, CardModule, DetailField, StatusDetail, DatePipe],
  templateUrl: './profile-info.html'
})
export class ProfileInfo {

  public readonly data = input(new FullProfile());
  public readonly loading = input(false);

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
