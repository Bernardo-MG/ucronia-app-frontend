import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appInvalidField]'
})
export class InvalidFieldDirective implements OnInit, OnChanges, OnDestroy {

  @Input() appInvalidField: string | FormControl | null = null;

  @Input() backendFailure: boolean = false;

  private statusChangeSubscription: Subscription | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private controlDir: NgControl,
    private formGroupDirective: FormGroupDirective
  ) { }

  ngOnInit(): void {
    const control = this.getFormControl();

    if (control) {
      this.statusChangeSubscription = control.statusChanges.subscribe(() => {
        this.updateFieldClass();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appInvalidField'] || changes['backendFailure']) {
      this.updateFieldClass();
    }
  }

  ngOnDestroy(): void {
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
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
