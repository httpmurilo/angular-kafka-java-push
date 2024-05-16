import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  standalone:  true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [MatToolbarModule],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
