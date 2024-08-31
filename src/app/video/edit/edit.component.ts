import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null
  showAlert = false
  alertMsg = 'Please wait! Updating clip.'
  alertColor = 'blue'
  inSubmission = false
  @Output() update = new EventEmitter()

  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ) { }

  clipID = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  editForm = new FormGroup ({
    title: this.title,
    clipID: this.clipID
  })

  ngOnInit(): void {
      this.modal.register('editClip')
  }
  
  ngOnDestroy(): void {
      this.modal.unregister('editClip')
  }

  ngOnChanges(): void {
      if(!this.activeClip) {
        return
      }

      this.showAlert = false
      this.inSubmission = false
      this.clipID.setValue(this.activeClip.docID as string)
      this.title.setValue(this.activeClip.title)
  }

  submit() {
    if(!this.activeClip) {
      return
    }

    this.showAlert = true
    this.alertMsg = 'Please wait! Updating clip.'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      this.clipService.updateClip(this.clipID.value, this.title.value)
    }
    catch (e) {
      this.alertMsg = 'Something went wrong. Try again later'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)

    this.inSubmission = false
    this.alertMsg = "Success!"
    this.alertColor = 'green'
  }
}
