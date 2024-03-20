import { Component, Input } from '@angular/core';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'assoc-library-publisher-list',
  standalone: true,
  imports: [],
  templateUrl: './library-publisher-list.component.html'
})
export class LibraryPublisherListComponent {

  @Input() data = new Publisher();

}
