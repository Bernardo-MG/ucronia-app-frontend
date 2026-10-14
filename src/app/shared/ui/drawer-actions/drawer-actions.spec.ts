import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Button, ButtonModule } from 'primeng/button';
import { DrawerActions } from './drawer-actions';

@Component({
  imports: [DrawerActions, ButtonModule],
  template: `<shared-drawer-actions [showDelete]="false" [showEdit]="false">
    <p-button drawerActionsStart label="Descargar" (onClick)="downloads = downloads + 1" />
    <p-button drawerActionsEnd label="Publicar" (onClick)="publications = publications + 1" />
  </shared-drawer-actions>`
})
class ProjectionHost {
  public downloads = 0;
  public publications = 0;
}

describe('DrawerActions', () => {
  let fixture: ComponentFixture<DrawerActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerActions, ProjectionHost],
      providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerActions);
    fixture.detectChanges();
  });

  function button(action: string): HTMLButtonElement {
    return fixture.nativeElement.querySelector(`p-button[data-action="${action}"] button`);
  }

  it('gives delete a danger outline and edit primary styling with visible labels', () => {
    const controls = fixture.debugElement.queryAll(By.directive(Button));
    expect(controls[0].componentInstance.severity).toBe('danger');
    expect(controls[0].componentInstance.outlined).toBeTrue();
    expect(controls[1].componentInstance.outlined).toBeFalse();
    expect(button('delete').textContent).toContain('Eliminar');
    expect(button('edit').textContent).toContain('Editar');
    expect(button('delete').getAttribute('type')).toBe('button');
    expect(button('edit').getAttribute('type')).toBe('button');
  });

  it('forwards the original delete event while its confirmation anchor is available', () => {
    const received: { event?: Event; target: EventTarget | null } = { target: null };
    fixture.componentInstance.delete.subscribe(event => {
      received.event = event;
      received.target = event.currentTarget;
    });
    const event = new MouseEvent('click', { bubbles: true });
    button('delete').dispatchEvent(event);
    expect(received.event).toBe(event);
    expect(received.target).toBe(button('delete'));
  });

  it('emits edit once and prevents both actions while loading', () => {
    const edit = spyOn(fixture.componentInstance.edit, 'emit');
    const remove = spyOn(fixture.componentInstance.delete, 'emit');
    button('edit').click();
    expect(edit).toHaveBeenCalledTimes(1);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(button('edit').disabled).toBeTrue();
    expect(button('delete').disabled).toBeTrue();
    button('edit').click();
    button('delete').click();
    expect(edit).toHaveBeenCalledTimes(1);
    expect(remove).not.toHaveBeenCalled();
  });

  it('supports separate action permissions, visibility, and accessible entity labels', () => {
    fixture.componentRef.setInput('deleteDisabled', true);
    fixture.componentRef.setInput('editLabel', 'Editar llave');
    fixture.detectChanges();
    expect(button('delete').disabled).toBeTrue();
    expect(button('edit').disabled).toBeFalse();
    expect(button('edit').getAttribute('aria-label')).toBe('Editar llave');
    fixture.componentRef.setInput('showDelete', false);
    fixture.componentRef.setInput('editDisabled', true);
    fixture.detectChanges();
    expect(button('delete')).toBeNull();
    expect(button('edit').disabled).toBeTrue();
  });

  it('keeps projected actions interactive without showing default edit or delete controls', () => {
    const host = TestBed.createComponent(ProjectionHost);
    host.detectChanges();
    expect(host.nativeElement.querySelector('[data-action="edit"]')).toBeNull();
    expect(host.nativeElement.querySelector('[data-action="delete"]')).toBeNull();
    host.nativeElement.querySelector('p-button[label="Descargar"] button').click();
    host.nativeElement.querySelector('p-button[label="Publicar"] button').click();
    expect(host.componentInstance.downloads).toBe(1);
    expect(host.componentInstance.publications).toBe(1);
  });
});
