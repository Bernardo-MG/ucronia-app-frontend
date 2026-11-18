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

  public readonly selectedStatus: Profiletype = Profiletype.ALL;
  public readonly statusOptions: any[] = [{ label: 'Todos', value: Profiletype.ALL }, { label: 'Socios', value: Profiletype.MEMBER }, { label: 'Invitados', value: Profiletype.GUEST }, { label: 'Esponsors', value: Profiletype.SPONSOR }];

}
