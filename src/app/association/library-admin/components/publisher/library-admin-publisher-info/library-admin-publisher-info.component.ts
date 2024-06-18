import { Component, Input } from '@angular/core';
import { Publisher } from '@app/association/library/models/publisher';

@Component({
  selector: 'assoc-library-admin-publisher-info',
  standalone: true,
  imports: [],
  templateUrl: './library-admin-publisher-info.component.html'
})
export class LibraryAdminPublisherInfoComponent {

  @Input() data = new Publisher();

}
