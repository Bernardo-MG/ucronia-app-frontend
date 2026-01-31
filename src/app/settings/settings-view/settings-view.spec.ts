import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { AssociationSettingsService } from '../association-settings-service';
import { SettingsView } from './settings-view';

describe('SettingsView', () => {
  let component: SettingsView;
  let fixture: ComponentFixture<SettingsView>;

  const ucroniaClientMock = {
    setting: {
      getAll: jasmine.createSpy().and.returnValue(of([])),
      update: jasmine.createSpy().and.returnValue(of({}))
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsView],
      providers: [
        AssociationSettingsService,
        { provide: UcroniaClient, useValue: ucroniaClientMock }
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
