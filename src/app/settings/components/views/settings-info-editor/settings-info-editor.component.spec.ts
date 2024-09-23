import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationSettingsService } from '@app/settings/service/association-settings.service';
import { SettingsInfoEditorComponent } from './settings-info-editor.component';

describe('SettingsInfoEditorComponent', () => {
  let component: SettingsInfoEditorComponent;
  let fixture: ComponentFixture<SettingsInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SettingsInfoEditorComponent
      ],
      providers: [
        AssociationSettingsService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
