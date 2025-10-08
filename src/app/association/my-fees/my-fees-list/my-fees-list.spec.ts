import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFeesList } from './my-fees-list';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MyFeesList', () => {
  let component: MyFeesList;
  let fixture: ComponentFixture<MyFeesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MyFeesList],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
