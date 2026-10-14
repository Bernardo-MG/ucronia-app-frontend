import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoleService } from '../role-service';
import { RoleChangePermission } from './role-change-permission';

describe('RoleChangePermission', () => {
  let component: RoleChangePermission;
  let fixture: ComponentFixture<RoleChangePermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoleChangePermission
      ],
      providers: [
        RoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleChangePermission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('requires a selection change and blocks saving during loading', () => {
    const permission = { name: 'test:read', resource: 'test', action: 'read' };
    fixture.componentRef.setInput('permissions', [permission]);
    fixture.detectChanges();
    const emitted = spyOn(component.save, 'emit');
    expect(component.saveEnabled).toBeFalse();
    component.onSave();
    expect(emitted).not.toHaveBeenCalled();
    component.clearSelection();
    expect(component.saveEnabled).toBeTrue();
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    component.onSave();
    expect(component.form.disabled).toBeTrue();
    expect(emitted).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeTrue();
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
    component.onSave();
    expect(emitted).toHaveBeenCalledWith([]);
  });

});
