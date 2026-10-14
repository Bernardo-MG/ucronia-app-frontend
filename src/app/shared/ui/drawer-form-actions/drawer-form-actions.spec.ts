import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DrawerModule } from 'primeng/drawer';
import { DrawerFormActions } from './drawer-form-actions';

@Component({
  imports: [DrawerModule, DrawerFormActions, ReactiveFormsModule],
  template: `<p-drawer [visible]="visible" position="right">
    <form id="external-drawer-form" [formGroup]="form" (ngSubmit)="submissions = submissions + 1">
      <input formControlName="name" />
    </form>
    <ng-template #footer>
      <shared-drawer-form-actions formId="external-drawer-form" submitLabel="Crear llave"
        [disabled]="form.invalid" [loading]="loading" (cancelForm)="cancellations = cancellations + 1" />
    </ng-template>
  </p-drawer>`
})
class ExternalFormHost {
  public form = new FormGroup({ name: new FormControl('', Validators.required) });
  public loading = false;
  public visible = false;
  public submissions = 0;
  public cancellations = 0;
}

@Component({
  imports: [DrawerFormActions, ReactiveFormsModule],
  template: `<form [formGroup]="form" (ngSubmit)="submissions = submissions + 1">
    <shared-drawer-form-actions [showCancel]="false" submitLabel="Guardar cambios" />
  </form>`
})
class InlineFormHost {
  public form = new FormGroup({});
  public submissions = 0;
}

describe('DrawerFormActions', () => {
  let fixture: ComponentFixture<ExternalFormHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalFormHost, InlineFormHost],
      providers: [provideNoopAnimations(), provideZonelessChangeDetection()]
    }).compileComponents();
    fixture = TestBed.createComponent(ExternalFormHost);
    fixture.detectChanges();
    fixture.componentInstance.visible = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function button(action: string): HTMLButtonElement {
    const form = document.querySelector<HTMLFormElement>('#external-drawer-form');
    return form!.closest('.p-drawer')!.querySelector(`button[data-action="${action}"]`)!;
  }

  function enable(): void {
    fixture.componentInstance.form.controls.name.setValue('Llave');
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
  }

  it('renders in the fixed drawer footer and associates the primary button with the content form', () => {
    expect(button('submit').closest('.p-drawer-footer')).not.toBeNull();
    expect(button('submit').closest('.p-drawer-content')).toBeNull();
    expect(button('submit').form).toBe(document.querySelector<HTMLFormElement>('#external-drawer-form'));
    expect(button('submit').textContent).toContain('Crear llave');
    expect(button('submit').classList.contains('h-11')).toBeTrue();
    expect(button('cancel').classList.contains('h-11')).toBeTrue();
  });

  it('blocks invalid submissions and submits the associated valid form exactly once', () => {
    button('submit').click();
    expect(fixture.componentInstance.submissions).toBe(0);
    enable();
    button('submit').click();
    expect(fixture.componentInstance.submissions).toBe(1);
  });

  it('preserves native form submission used by the Enter key', () => {
    enable();
    button('submit').form?.requestSubmit(button('submit'));
    expect(fixture.componentInstance.submissions).toBe(1);
  });

  it('cancels without submitting and blocks both actions during a save', () => {
    enable();
    button('cancel').click();
    expect(fixture.componentInstance.cancellations).toBe(1);
    expect(fixture.componentInstance.submissions).toBe(0);
    fixture.componentInstance.loading = true;
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(button('submit').disabled).toBeTrue();
    expect(button('cancel').disabled).toBeTrue();
    button('submit').click();
    button('cancel').click();
    expect(fixture.componentInstance.submissions).toBe(0);
    expect(fixture.componentInstance.cancellations).toBe(1);
  });

  it('also submits a containing form when no external form id is supplied', () => {
    const inline = TestBed.createComponent(InlineFormHost);
    inline.detectChanges();
    const submit: HTMLButtonElement = inline.nativeElement.querySelector('button[data-action="submit"]');
    expect(submit.form).toBe(inline.nativeElement.querySelector('form'));
    submit.click();
    expect(inline.componentInstance.submissions).toBe(1);
    expect(inline.nativeElement.querySelector('button[data-action="cancel"]')).toBeNull();
  });
});
