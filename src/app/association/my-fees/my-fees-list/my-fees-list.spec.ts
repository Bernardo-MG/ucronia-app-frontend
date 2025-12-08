import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeesList } from './my-fees-list';

describe('MyFeesList', () => {
  let component: MyFeesList;
  let fixture: ComponentFixture<MyFeesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFeesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFeesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
