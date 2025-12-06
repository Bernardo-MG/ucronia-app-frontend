import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'assoc-contact-status-selector',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './contact-status-selector.html'
})
export class ContactStatusSelector {
  
  public readonly select = output<'all' | 'members' | 'guests' | 'sponsors'>();

  public statusOptions: any[] = [{ label: 'Todos', value: 'all' }, { label: 'Socios', value: 'members' }, { label: 'Invitados', value: 'guests' }, { label: 'Esponsors', value: 'sponsors' }];
  public selectedStatus: 'all' | 'members' | 'guests' | 'sponsors' = 'all';

}
