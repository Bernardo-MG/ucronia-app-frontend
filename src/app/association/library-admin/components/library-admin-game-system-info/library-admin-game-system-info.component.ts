import { Component, Input } from '@angular/core';
import { GameSystem } from '../../models/game-system';

@Component({
  selector: 'assoc-library-admin-game-system-info',
  standalone: true,
  imports: [],
  templateUrl: './library-admin-game-system-info.component.html'
})
export class LibraryAdminGameSystemInfoComponent {

  @Input() data = new GameSystem();

}
