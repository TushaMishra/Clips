import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.css'],
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true

  constructor(public ClipService: ClipService) { 
    this.ClipService.getClips()
  }
  ngOnInit(): void {
    if(this.scrollable) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  ngOnDestroy(): void {
    if(this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll)
    }

    this.ClipService.pageClips = []
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const bottomOfWindow = Math.ceil(scrollTop) + innerHeight === offsetHeight

    if(bottomOfWindow) {
      this.ClipService.getClips()
    }
  }
}
