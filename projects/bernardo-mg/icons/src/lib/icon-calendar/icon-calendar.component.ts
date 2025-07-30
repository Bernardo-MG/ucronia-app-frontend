
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-calendar',
    imports: [FontAwesomeModule],
    templateUrl: './icon-calendar.component.html'
})
export class IconCalendarComponent {

  public icon = faCalendar;

}
