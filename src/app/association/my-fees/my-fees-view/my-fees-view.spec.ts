import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { MyFee } from '@ucronia/domain';
import { of } from 'rxjs';
import { MyFeesService } from '../my-fees-service';
import { MyFeesView } from './my-fees-view';

describe('MyFeesView', () => {
  let component: MyFeesView;
  let fixture: ComponentFixture<MyFeesView>;

  const myFeesMock = {
    getAll: vi.fn(
    ).mockName("MyFeesService.getAll"),
    hasFees: vi.fn(
  ).mockName("MyFeesService.hasFees")
};

  beforeEach(async () => {
    myFeesMock.getAll.mockReturnValue(
      of(new Page<MyFee>())
    );

    myFeesMock.hasFees.mockReturnValue(of(false));

    await TestBed.configureTestingModule({
      imports: [MyFeesView],
      providers: [
        { provide: MyFeesService, useValue: myFeesMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyFeesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
