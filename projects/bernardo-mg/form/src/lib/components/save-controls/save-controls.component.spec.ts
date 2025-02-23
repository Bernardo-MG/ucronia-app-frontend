import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveControlsComponent } from '@bernardo-mg/form';

describe('SaveControlsComponent', () => {
  let component: SaveControlsComponent;
  let fixture: ComponentFixture<SaveControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
