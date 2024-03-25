import { Component, Input } from '@angular/core';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'assoc-library-publisher-info',
  standalone: true,
  imports: [],
  templateUrl: './library-publisher-info.component.html'
})
export class LibraryPublisherInfoComponent {

  @Input() data = new Publisher();

}
