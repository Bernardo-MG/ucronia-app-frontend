import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationValuesEditorComponent } from './configuration-values-editor.component';

describe('ConfigurationValuesEditorComponent', () => {
  let component: ConfigurationValuesEditorComponent;
  let fixture: ComponentFixture<ConfigurationValuesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationValuesEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurationValuesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
