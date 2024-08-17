import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl, NgControl, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appInvalidField]'
})
export class InvalidFieldDirective implements OnChanges {

  @Input() appInvalidField: string | FormControl | null = null;

  @Input() backendFailure: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private controlDir: NgControl,
    private formGroupDirective: FormGroupDirective
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appInvalidField'] || changes['backendFailure']) {
      this.updateFieldClass();
    }
  }

  private updateFieldClass(): void {
    const control = this.getFormControl();

    if (
      (control && control.invalid && (control.dirty || control.touched)) ||
      (this.backendFailure)
    ) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  private getFormControl(): FormControl | null {
    let formControl;

    if (typeof this.appInvalidField === 'string') {
      formControl = this.formGroupDirective.form.get(this.appInvalidField) as FormControl;
    } else if (this.appInvalidField instanceof FormControl) {
      formControl = this.appInvalidField;
    } else if (this.controlDir && this.controlDir.control) {
      formControl = this.controlDir.control as FormControl;
    } else {
      formControl = null;
    }

    return formControl;
  }
}
