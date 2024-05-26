import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFeesFrontpageComponent } from './my-fees-frontpage.component';

describe('MyFeesFrontpageComponent', () => {
  let component: MyFeesFrontpageComponent;
  let fixture: ComponentFixture<MyFeesFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MyFeesFrontpageComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFeesFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
