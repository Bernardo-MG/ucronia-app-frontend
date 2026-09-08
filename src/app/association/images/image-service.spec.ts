import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { Image } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ImageService } from './image-service';

describe('ImageService', () => {
  let service: ImageService;
  const image = Object.assign(new Image(), { number: 1, name: 'Image', description: 'Description', mediaType: 'image/png' });
  const client = {
    image: {
      page: jasmine.createSpy().and.returnValue(of({ content: [] })),
      get: jasmine.createSpy().and.returnValue(of(image)),
      content: jasmine.createSpy().and.returnValue(of(new Blob(['data'], { type: 'image/png' }))),
      contentUrl: jasmine.createSpy().and.returnValue('/images/1/content'),
      create: jasmine.createSpy().and.returnValue(of(image)),
      update: jasmine.createSpy().and.returnValue(of(image)),
      delete: jasmine.createSpy().and.returnValue(of(image))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MessageService, { provide: UcroniaClient, useValue: client }] });
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should upload an image', () => {
    const file = new File(['data'], 'image.png', { type: 'image/png' });
    service.create(image, file).subscribe();
    expect(client.image.create).toHaveBeenCalledWith(image.name, image.description, file);
  });

  it('should reuse the current content when only metadata changes', () => {
    service.update(image).subscribe();
    expect(client.image.content).toHaveBeenCalledWith(image.number);
    expect(client.image.update).toHaveBeenCalledWith(image.number, image.name, image.description,
      jasmine.any(File));
  });

  it('should delete an image', () => {
    service.delete(image.number).subscribe();
    expect(client.image.delete).toHaveBeenCalledWith(image.number);
  });
});
