import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFeesFrontpageContainer } from './my-fees-list.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MyFeesFrontpageContainer', () => {
  let component: MyFeesFrontpageContainer;
  let fixture: ComponentFixture<MyFeesFrontpageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MyFeesFrontpageContainer],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
