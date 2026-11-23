import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ImageService } from '../image-service';
import { ImageContent } from './image-content';

@Component({
  imports: [ImageContent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<img [assocImageContent]="imageNumber" alt="">'
})
class TestHost {

  public readonly imageNumber = 4;

}

describe('ImageContent', () => {
  let fixture: ComponentFixture<TestHost>;
  const content = new Blob(['image'], { type: 'image/png' });
  const service = { content: vi.fn().mockReturnValue(of(content)) };

  beforeEach(async () => {
    service.content.mockClear();
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:image');
    vi.spyOn(URL, 'revokeObjectURL').mockReturnValue(undefined);
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
    expect(image.src).toBe('blob:image');
  });

  it('should revoke the object URL when destroyed', () => {
    fixture.detectChanges();

    fixture.destroy();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:image');
  });
});
