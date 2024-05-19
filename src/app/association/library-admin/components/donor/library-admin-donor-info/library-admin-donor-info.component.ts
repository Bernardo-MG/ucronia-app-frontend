import { Component, Input } from '@angular/core';
import { Donor } from '@app/association/library-admin/models/donor';

@Component({
  selector: 'assoc-library-admin-donor-info',
  standalone: true,
  imports: [],
  templateUrl: './library-admin-donor-info.component.html'
})
export class LibraryAdminDonorInfoComponent {

  @Input() data = new Donor();

}
