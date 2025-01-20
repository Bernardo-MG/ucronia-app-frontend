import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Failure } from '@app/core/api/models/failure';

@Component({
    selector: 'app-input-failure-feedback',
    templateUrl: './input-failure-feedback.component.html',
    standalone: false
})
export class InputFailureFeedbackComponent implements AfterViewInit {

  @Input() failures: Failure[] = [];

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    // get the element's parent node
    const parent = this.el.nativeElement.parentNode;

    // move all children out of the element
    while (this.el.nativeElement.firstChild) {
      parent.insertBefore(this.el.nativeElement.firstChild, this.el.nativeElement);
    }
    // remove the empty element
    parent.removeChild(this.el.nativeElement);
  }
}
