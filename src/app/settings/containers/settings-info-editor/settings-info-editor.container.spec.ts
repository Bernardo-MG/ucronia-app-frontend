import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationSettingsService } from '@app/settings/service/association-settings.service';
import { SettingsInfoEditorContainer } from './settings-info-editor.container';

describe('SettingsInfoEditorContainer', () => {
  let component: SettingsInfoEditorContainer;
  let fixture: ComponentFixture<SettingsInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsInfoEditorContainer],
      providers: [
        AssociationSettingsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
