import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TagModule } from '@openng/optimus-ui/tag';

@Component({
  selector: 'assoc-profile-type-tag',
  imports: [TagModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './profile-type-tag.html'
})
export class ProfileTypeTag {

  public readonly types = input<string[]>([]);

  // Public methods
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
