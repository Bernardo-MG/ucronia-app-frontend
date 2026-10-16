import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { AssetFolder, Asset } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {

  private readonly client = inject(UcroniaClient);
  private readonly messages = inject(MessageService);

  public getAll(page: number | undefined, sort: Sorting, size: number | undefined = undefined): Observable<Page<Asset>> {
    return this.client.asset.image.page(page, size, sort);
  }

  public getAllForSelection(): Observable<Asset[]> {
    const sorting = new Sorting([new SortingProperty('name')]);
    return getAllPages((page, size) => this.getAll(page, sorting, size));
  }

  public getFolders(): Observable<AssetFolder[]> {
    return this.client.asset.folder.folders();
  }

  public getFolderImages(folderNumber: number, page: number | undefined, sort: Sorting,
    size: number | undefined = undefined): Observable<Page<Asset>> {
    return this.client.asset.folder.page(folderNumber, 'IMAGE', page, size, sort);
  }

  public getRootImages(page: number | undefined, sort: Sorting,
    size: number | undefined = undefined): Observable<Page<Asset>> {
    return this.client.asset.folder.page(null, 'IMAGE', page, size, sort);
  }

  public createFolder(name: string, parentNumber: number | null): Observable<AssetFolder> {
    return this.client.asset.folder.createFolder(name, parentNumber)
      .pipe(tap(() => this.notify('Creada', 'Carpeta creada')));
  }

  public updateFolder(folder: AssetFolder): Observable<AssetFolder> {
    return this.client.asset.folder.updateFolder(folder.number, folder.name, folder.parentNumber)
      .pipe(tap(() => this.notify('Actualizada', 'Carpeta actualizada')));
  }

  public deleteFolder(number: number): Observable<AssetFolder> {
    return this.client.asset.folder.deleteFolder(number)
      .pipe(tap(() => this.notify('Borrada', 'Carpeta borrada')));
  }

  public move(imageNumber: number, folderNumber: number | null): Observable<Asset> {
    const request = folderNumber === null ? this.client.asset.folder.moveToRoot(imageNumber, 'IMAGE')
      : this.client.asset.folder.moveToFolder(imageNumber, folderNumber, 'IMAGE');
    return request.pipe(tap(() => this.notify('Movida', 'Imagen movida')));
  }

  public get(number: number): Observable<Asset> {
    return this.client.asset.image.get(number);
  }

  public contentUrl(number: number): string {
    return this.client.asset.image.contentUrl(number);
  }

  public content(number: number): Observable<Blob> {
    return this.client.asset.image.content(number);
  }

  public create(image: Asset, file: File): Observable<Asset> {
    return this.client.asset.image.create(image.name, image.description, image.publicAccess, file)
      .pipe(tap(() => this.notify('Creada', 'Imagen creada')));
  }

  public update(image: Asset, file?: File): Observable<Asset> {
    let response: Observable<Asset>;

    if (file) {
      response = this.client.asset.image.update(image.number, image.name, image.description, image.publicAccess, file);
    } else {
      response = this.client.asset.image.patch(image.number, image.name, image.description, image.publicAccess);
    }
    response = response.pipe(tap(() => this.notify('Actualizada', 'Imagen actualizada')));

    return response;
  }

  public delete(number: number): Observable<Asset> {
    return this.client.asset.image.delete(number)
      .pipe(tap(() => this.notify('Borrada', 'Imagen borrada')));
  }

  private notify(summary: string, detail: string): void {
    this.messages.add({ severity: 'info', summary, detail, life: 3000 });
  }
}
