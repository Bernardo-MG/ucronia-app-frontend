import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationConfigurationService } from '../../../../../configuration/service/association-configuration.service';
import { ConfigurationInfoEditorComponent } from './configuration-info-editor.component';

describe('ConfigurationInfoEditorComponent', () => {
  let component: ConfigurationInfoEditorComponent;
  let fixture: ComponentFixture<ConfigurationInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ConfigurationInfoEditorComponent
      ],
      providers: [
        AssociationConfigurationService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfigurationInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
