import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
// import { ModalService } from '../services/modal.service';


@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent
  ],
  // For injecting service in ian ndividual module
  // providers: [ModalService]
})
export class SharedModule { }
