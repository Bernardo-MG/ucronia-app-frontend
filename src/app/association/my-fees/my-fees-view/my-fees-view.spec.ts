import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatedResponse } from '@bernardo-mg/request';
import { Fee } from '@ucronia/domain';
import { of } from 'rxjs';
import { MyFeesService } from '../my-fees-service';
import { MyFeesView } from './my-fees-view';

describe('MyFeesView', () => {
  let component: MyFeesView;
  let fixture: ComponentFixture<MyFeesView>;

  const myFeesMock = jasmine.createSpyObj<MyFeesService>(
    'MyFeesService',
    ['getAll']
  );

  beforeEach(async () => {
    myFeesMock.getAll.and.returnValue(
      of(new PaginatedResponse<Fee>())
    );

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
