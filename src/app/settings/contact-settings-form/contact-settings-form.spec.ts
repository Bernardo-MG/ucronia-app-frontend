import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSettingsForm } from './contact-settings-form';

describe('ContactSettingsForm', () => {
  let component: ContactSettingsForm;
  let fixture: ComponentFixture<ContactSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactSettingsForm
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSettingsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when inputs changes', () => {

    it('should update email', () => {
      component.ngOnChanges({
        email: { currentValue: 'test@example.com', previousValue: '', firstChange: false, isFirstChange: () => false }
      });

      expect(component.form.get('email')?.value).toBe('test@example.com');
    });

    it('should update Instagram', () => {
      component.ngOnChanges({
        instagram: { currentValue: '@user', previousValue: '', firstChange: false, isFirstChange: () => false }
      });

      expect(component.form.get('instagram')?.value).toBe('@user');
    });

    it('should update Google Maps', () => {
      component.ngOnChanges({
        googleMaps: { currentValue: 'maps-link', previousValue: '', firstChange: false, isFirstChange: () => false }
      });

      expect(component.form.get('googleMaps')?.value).toBe('maps-link');
    });

    it('should update Teamup', () => {
      component.ngOnChanges({
        teamUp: { currentValue: 'teamup-link', previousValue: '', firstChange: false, isFirstChange: () => false }
      });

      expect(component.form.get('teamUp')?.value).toBe('teamup-link');
    });

    it('should update loading state', () => {
      component.ngOnChanges({
        loading: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false }
      });

      expect(component.formStatus.loading).toBe(true);
    });

  });

  describe('save event', () => {

    it('should emit changed values on save', () => {
      spyOn(component.save, 'emit');

      component.form.get('email')?.setValue('new@example.com');
      component.form.get('email')?.markAsDirty();

      component.onSave();

      expect(component.save.emit).toHaveBeenCalledWith({
        email: 'new@example.com'
      });
    });

    it('should emit multiple changed values', () => {
      spyOn(component.save, 'emit');

      component.form.get('instagram')?.setValue('insta');
      component.form.get('instagram')?.markAsDirty();

      component.form.get('teamUp')?.setValue('team');
      component.form.get('teamUp')?.markAsDirty();

      component.onSave();

      expect(component.save.emit).toHaveBeenCalledWith({
        instagram: 'insta',
        teamUp: 'team'
      });
    });

    it('should not emit if no values were changed', () => {
      spyOn(component.save, 'emit');

      component.onSave();

      expect(component.save.emit).not.toHaveBeenCalled();
    });

  });

});
