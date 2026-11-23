import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { Asset } from '@ucronia/domain';
import { MessageService } from '@openng/optimus-ui/api';
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
      page: vi.fn().mockReturnValue(of({ content: [], last: true, page: 1 })),
      get: vi.fn().mockReturnValue(of(image)),
      content: vi.fn().mockReturnValue(of(new Blob(['data'], { type: 'image/png' }))),
      contentUrl: vi.fn().mockReturnValue('/assets/1/content'),
      create: vi.fn().mockReturnValue(of(image)),
      update: vi.fn().mockReturnValue(of(image)),
      patch: vi.fn().mockReturnValue(of(image)),
      delete: vi.fn().mockReturnValue(of(image))
      },
      folder: {}
    }
  };

  beforeEach(() => {
    for (const spy of Object.values(client.asset.image)) spy.mockClear();
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

    expect(client.asset.image.page).toHaveBeenCalledWith(undefined, 100, expect.anything());
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
