import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // To inject service in an indiviadual component  
  // providers: [ModalService]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalID = ''
  constructor(
    public modal: ModalService, 
    public el: ElementRef
  ) { }


  closeModal() {
    this.modal.toggleModal(this.modalID)
  }
  ngOnInit(): void {
     document.body.appendChild(this.el.nativeElement)
  }

  ngOnDestroy(): void {
      document.body.removeChild(this.el.nativeElement)
  }
}
