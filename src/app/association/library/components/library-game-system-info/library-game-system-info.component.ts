import { Component, Input } from '@angular/core';
import { GameSystem } from '../../models/game-system';

@Component({
  selector: 'assoc-library-game-system-info',
  standalone: true,
  imports: [],
  templateUrl: './library-game-system-info.component.html'
})
export class LibraryGameSystemInfoComponent {

  @Input() data = new GameSystem();

}
