import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationSettingsService } from '../association-settings-service';
import { SettingsInfoEditor } from './settings-edition';

describe('SettingsInfoEditor', () => {
  let component: SettingsInfoEditor;
  let fixture: ComponentFixture<SettingsInfoEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsInfoEditor],
      providers: [
        AssociationSettingsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsInfoEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
