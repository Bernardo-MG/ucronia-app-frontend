import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CueLoadingComponent } from './cue-loading.component';

describe('CueLoadingComponent', () => {
  let component: CueLoadingComponent;
  let fixture: ComponentFixture<CueLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CueLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CueLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
