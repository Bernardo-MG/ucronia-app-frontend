import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AssociationConfigurationService } from '../../service/association-configuration.service';
import { ConfigurationFormComponent } from '../configuration-form/configuration-form.component';
import { ConfigurationInfoComponent } from '../configuration-info/configuration-info.component';
import { ConfigurationInfoEditorComponent } from './configuration-info-editor.component';

describe('ConfigurationInfoEditorComponent', () => {
  let component: ConfigurationInfoEditorComponent;
  let fixture: ComponentFixture<ConfigurationInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        ConfigurationInfoEditorComponent,
        ConfigurationFormComponent,
        ConfigurationInfoComponent
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
