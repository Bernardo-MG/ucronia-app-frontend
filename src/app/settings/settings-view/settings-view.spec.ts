import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AssociationSettingsService } from '../association-settings-service';
import { SettingsView } from './settings-view';

describe('SettingsView', () => {
  let component: SettingsView;
  let fixture: ComponentFixture<SettingsView>;

  const serviceMock = {
    getEmail: jasmine.createSpy().and.returnValue(of('')),
    getInstagram: jasmine.createSpy().and.returnValue(of('')),
    getMap: jasmine.createSpy().and.returnValue(of('')),
    getCalendar: jasmine.createSpy().and.returnValue(of(''))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsView],
      providers: [
        { provide: AssociationSettingsService, useValue: serviceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
