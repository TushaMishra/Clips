import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean
}

// Three methods of making a class injectable
// 1) 
// Make gloabally available
@Injectable({
  providedIn: 'root'
})

// 2) and 3) 
// For 2) module level and 3) Component level
// @Injectable()


export class ModalService {
  private modals: IModal[] = []

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
    console.log(this.modals)
  }

  isModalOpen(id: string) : boolean {
    // Boolean(this.modals.find(element => element.id === id)?.visible)
    return !!this.modals.find(element => element.id === id)?.visible;
  }
  
  toggleModal(id: string) {
    const modal = this.modals.find(element => element.id === id)

    if(modal) {
      modal.visible = !modal.visible
    }
  }
}
