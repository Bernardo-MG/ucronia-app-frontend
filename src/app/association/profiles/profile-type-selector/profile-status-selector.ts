import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'assoc-profile-status-selector',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './profile-status-selector.html'
})
export class ProfileStatusSelector {
  
  public readonly filter = output<'all' | 'member' | 'guest' | 'sponsor'>();

  public statusOptions: any[] = [{ label: 'Todos', value: 'all' }, { label: 'Socios', value: 'member' }, { label: 'Invitados', value: 'guest' }, { label: 'Esponsors', value: 'sponsor' }];
  public selectedStatus: 'all' | 'member' | 'guest' | 'sponsor' = 'all';

}
