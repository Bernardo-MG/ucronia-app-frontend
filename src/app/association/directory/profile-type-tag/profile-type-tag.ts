import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-profile-type-tag',
  imports: [TagModule],
  templateUrl: './profile-type-tag.html'
})
export class ProfileTypeTag {

  public readonly types = input<string[]>([]);

  public getName(type: string): string {
    switch (type) {
      case 'member':
        return 'Socio';
      case 'sponsor':
        return 'Esponsor';
      case 'guest':
        return 'Invitado';
      default:
        return type;
    }
  }

}
