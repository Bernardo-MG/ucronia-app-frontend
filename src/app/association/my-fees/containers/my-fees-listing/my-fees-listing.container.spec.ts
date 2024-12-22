import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFeesFrontpageContainer } from './my-fees-listing.container';

describe('MyFeesFrontpageContainer', () => {
  let component: MyFeesFrontpageContainer;
  let fixture: ComponentFixture<MyFeesFrontpageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MyFeesFrontpageContainer
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFeesFrontpageContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
