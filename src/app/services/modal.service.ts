import { Injectable } from '@angular/core';

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
  visible = false

  constructor() { }
}
