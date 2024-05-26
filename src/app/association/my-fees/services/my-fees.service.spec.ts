import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MyFeesService } from './my-fees.service';

describe('MyFeesService', () => {
  let service: MyFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MyFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
