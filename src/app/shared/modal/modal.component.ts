import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // To inject service in an indiviadual component  
  // providers: [ModalService]
})
export class ModalComponent implements OnInit {
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
}
