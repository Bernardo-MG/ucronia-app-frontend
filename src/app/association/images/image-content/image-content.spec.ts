import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ImageService } from '../image-service';
import { ImageContent } from './image-content';

@Component({
  imports: [ImageContent],
  template: '<img [assocImageContent]="imageNumber" alt="">'
})
class TestHost {
  public imageNumber = 4;
}

describe('ImageContent', () => {
  let fixture: ComponentFixture<TestHost>;
  const content = new Blob(['image'], { type: 'image/png' });
  const service = { content: jasmine.createSpy().and.returnValue(of(content)) };

  beforeEach(async () => {
    service.content.calls.reset();
    spyOn(URL, 'createObjectURL').and.returnValue('blob:image');
    spyOn(URL, 'revokeObjectURL');
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [{ provide: ImageService, useValue: service }]
    }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
  });

  it('should load image content through the authenticated HTTP client', () => {
    fixture.detectChanges();

    const image = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(service.content).toHaveBeenCalledWith(4);
    expect(URL.createObjectURL).toHaveBeenCalledWith(content);
    expect(image.src).toEndWith('blob:image');
  });

  it('should revoke the object URL when destroyed', () => {
    fixture.detectChanges();

    fixture.destroy();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:image');
  });
});
