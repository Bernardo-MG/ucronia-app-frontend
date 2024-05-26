import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeesListComponent } from './my-fees-list.component';

describe('MyFeesListComponent', () => {
  let component: MyFeesListComponent;
  let fixture: ComponentFixture<MyFeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFeesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
