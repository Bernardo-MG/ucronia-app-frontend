import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationSettingsService } from '../association-settings-service';
import { SettingsView } from './settings-view';

describe('SettingsView', () => {
  let component: SettingsView;
  let fixture: ComponentFixture<SettingsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsView],
      providers: [
        AssociationSettingsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
