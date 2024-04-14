import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FrontpageService } from './frontpage.service';

describe('FrontpageService', () => {
  let service: FrontpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        FrontpageService
      ]
    });
    service = TestBed.inject(FrontpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
