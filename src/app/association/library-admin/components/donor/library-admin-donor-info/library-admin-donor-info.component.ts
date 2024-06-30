import { Component, Input } from '@angular/core';
import { Person } from '@app/association/library/models/person';

@Component({
  selector: 'assoc-library-admin-donor-info',
  standalone: true,
  imports: [],
  templateUrl: './library-admin-donor-info.component.html'
})
export class LibraryAdminDonorInfoComponent {

  @Input() data = new Person();

}
