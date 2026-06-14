import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Profiletype } from '../model/profyle-type';

@Component({
  selector: 'assoc-profile-status-selector',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './profile-status-selector.html'
})
export class ProfileStatusSelector {

  public readonly filter = output<Profiletype>();

  public statusOptions: any[] = [{ label: 'Todos', value: Profiletype.ALL }, { label: 'Socios', value: Profiletype.MEMBER }, { label: 'Invitados', value: Profiletype.GUEST }, { label: 'Esponsors', value: Profiletype.SPONSOR }];
  public selectedStatus: Profiletype = Profiletype.ALL;

}
