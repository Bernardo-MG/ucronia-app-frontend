import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-contact-type-tag',
  imports: [TagModule],
  templateUrl: './contact-type-tag.html'
})
export class ContactTypeTag {

  public readonly types = input<string[]>([]);

  public getName(type: string): string {
    switch (type) {
      case 'member':
        return 'Socio';
      default:
        return type;
    }
  }

}
