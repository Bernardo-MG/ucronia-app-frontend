import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-text-filter',
  imports: [FormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './text-filter.html'
})
export class TextFilter {

  public readonly filter = output<string>();

  public filterSubject = new Subject<string>();
  public filterValue = '';

  constructor() {
    this.filterSubject
      .pipe(debounceTime(300))
      .subscribe(() => this.filter.emit(this.filterValue));
  }

}
