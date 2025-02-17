import * as bootstrap from 'bootstrap';

export class ModalHandler {
    
  public openModal(modalId: string): void {
    // TODO: don't add Modal to the id
    const modalElement = document.getElementById(`${modalId}Modal`);
    if (modalElement) {
      let modal = bootstrap.Modal.getInstance(modalElement);
      if (!modal) {
        modal = new bootstrap.Modal(modalElement);
      }
      modal.show();
    }
  }

  public closeModal(modalId: string): void {
    // TODO: don't add Modal to the id
    const modalElement = document.getElementById(`${modalId}Modal`);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.toggle();
      }
    }
  }

}