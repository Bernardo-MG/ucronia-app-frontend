import { fakeAsync, tick } from '@angular/core/testing';
import { downloadFile } from './file-download';

describe('downloadFile', () => {
  it('should click a temporary link and defer revoking the blob URL', fakeAsync(() => {
    const content = new Blob(['document'], { type: 'application/pdf' });
    const link = document.createElement('a');
    vi.spyOn(document, 'createElement').mockReturnValue(link);
    vi.spyOn(link, 'click').mockReturnValue(undefined);
    vi.spyOn(link, 'remove').mockReturnValue(undefined);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:file');
    vi.spyOn(URL, 'revokeObjectURL').mockReturnValue(undefined);

    downloadFile(content, 'document.pdf');

    expect(URL.createObjectURL).toHaveBeenCalledWith(content);
    expect(link.href).toContain('blob:file');
    expect(link.download).toBe('document.pdf');
    expect(link.click).toHaveBeenCalled();
    expect(link.remove).toHaveBeenCalled();
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();

    tick(1000);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:file');
  }));
});
