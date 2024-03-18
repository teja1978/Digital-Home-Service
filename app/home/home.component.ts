import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Output() serviceFormClickedEvent = new EventEmitter<void>();
  showFormButton : boolean = false;
  showServiceForm : boolean = false;

  showFromButton() {
    this.showFormButton = true;
  }
 

  openServiceForm(): void {
    this.showServiceForm = true;
    console.log("Open Service form Emitter");
    this.serviceFormClickedEvent.emit();
  }
  
}
