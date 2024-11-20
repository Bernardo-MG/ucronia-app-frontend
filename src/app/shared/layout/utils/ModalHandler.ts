import * as bootstrap from 'bootstrap';

export class ModalHandler {
    
  public openModal(modalId: string): void {
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
    const modalElement = document.getElementById(`${modalId}Modal`);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.toggle();
      }
    }
  }

}