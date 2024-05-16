import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  standalone:  true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [NavbarComponent],
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  showToast: boolean = false;
  toastMessage: string = '';


  constructor() { }

   // Método para mostrar o toast notification
   showToastNotification(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    // Ocultar o toast depois de alguns segundos (por exemplo, 5 segundos)
    setTimeout(() => {
      this.hideToastNotification();
    }, 5000);
  }

  hideToastNotification() {
    this.showToast = false;
    this.toastMessage = '';
  }

  ngOnInit() {
  }

}
