import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(
    public modal: ModalService,
    public auth: AuthService,
    public afauth: AngularFireAuth
  ) {    
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.isModalOpen('auth')
    this.modal.toggleModal('auth')
  }

}