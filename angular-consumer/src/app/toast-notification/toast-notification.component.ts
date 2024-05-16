import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css']
})
export class ToastNotificationComponent implements OnInit {

  @Input() message: string | undefined;

  constructor() { }

  ngOnInit() {
  }

}
