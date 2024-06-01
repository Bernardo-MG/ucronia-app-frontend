import { Component } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'icon-calendar',
  templateUrl: './icon-calendar.component.html'
})
export class IconCalendarComponent {

  public icon = faCalendar;

}
