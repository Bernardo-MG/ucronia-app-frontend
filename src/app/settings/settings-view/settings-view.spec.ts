import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AssociationSettingsService } from '../association-settings-service';
import { SettingsView } from './settings-view';

describe('SettingsView', () => {
  let component: SettingsView;
  let fixture: ComponentFixture<SettingsView>;

  const serviceMock = {
    getEmail: vi.fn().mockReturnValue(of('')),
    getInstagram: vi.fn().mockReturnValue(of('')),
    getMap: vi.fn().mockReturnValue(of('')),
    getCalendar: vi.fn().mockReturnValue(of('')),
    getTelegram: vi.fn().mockReturnValue(of(''))
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
