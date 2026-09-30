import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { Asset } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ImageService } from './image-service';

describe('ImageService', () => {
  let service: ImageService;
  const image = Object.assign(new Asset(), {
    number: 1, name: 'Image', description: 'Description', mediaType: 'image/png', publicAccess: false
  });
  const client = {
    asset: {
      image: {
      page: jasmine.createSpy().and.returnValue(of({ content: [], last: true, page: 1 })),
      get: jasmine.createSpy().and.returnValue(of(image)),
      content: jasmine.createSpy().and.returnValue(of(new Blob(['data'], { type: 'image/png' }))),
      contentUrl: jasmine.createSpy().and.returnValue('/assets/1/content'),
      create: jasmine.createSpy().and.returnValue(of(image)),
      update: jasmine.createSpy().and.returnValue(of(image)),
      patch: jasmine.createSpy().and.returnValue(of(image)),
      delete: jasmine.createSpy().and.returnValue(of(image))
      },
      folder: {}
    }
  };

  beforeEach(() => {
    for (const spy of Object.values(client.asset.image)) spy.calls.reset();
    TestBed.configureTestingModule({ providers: [MessageService, { provide: UcroniaClient, useValue: client }] });
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should upload an image', () => {
    const file = new File(['data'], 'image.png', { type: 'image/png' });
    service.create(image, file).subscribe();
    expect(client.asset.image.create).toHaveBeenCalledWith(image.name, image.description, image.publicAccess, file);
  });

  it('should load all images ordered by name for selectors', () => {
    service.getAllForSelection().subscribe();

    expect(client.asset.image.page).toHaveBeenCalledWith(1, 100, jasmine.anything());
  });

  it('should load image content through the API client', () => {
    service.content(image.number).subscribe();

    expect(client.asset.image.content).toHaveBeenCalledWith(image.number);
  });

  it('should update only metadata when no replacement file is supplied', () => {
    service.update(image).subscribe();
    expect(client.asset.image.patch).toHaveBeenCalledWith(image.number, image.name, image.description, image.publicAccess);
    expect(client.asset.image.content).not.toHaveBeenCalled();
    expect(client.asset.image.update).not.toHaveBeenCalled();
  });

  it('should preserve visibility when replacing image content', () => {
    const file = new File(['replacement'], 'replacement.png', { type: 'image/png' });
    service.update(image, file).subscribe();
    expect(client.asset.image.update)
      .toHaveBeenCalledWith(image.number, image.name, image.description, image.publicAccess, file);
  });

  it('should delete an image', () => {
    service.delete(image.number).subscribe();
    expect(client.asset.image.delete).toHaveBeenCalledWith(image.number);
  });
});
