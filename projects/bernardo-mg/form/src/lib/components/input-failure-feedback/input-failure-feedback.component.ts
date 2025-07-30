
import { AfterViewInit, Component, ElementRef, Input, inject } from '@angular/core';
import { FieldFailure } from '@bernardo-mg/request';

@Component({
  selector: 'form-input-failure-feedback',
  templateUrl: './input-failure-feedback.component.html'
})
export class InputFailureFeedbackComponent implements AfterViewInit {
  private el = inject(ElementRef);


  @Input() failures: FieldFailure[] = [];

  public ngAfterViewInit() {
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
