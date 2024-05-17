import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { KafkaState } from '../state/kafka.state';
import { Observable } from 'rxjs/internal/Observable';
import { ConnectWebSocket } from '@ngxs/websocket-plugin';

@Component({
  standalone:  true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [NavbarComponent],
  styleUrls: ['./home.component.css'],
  providers: [Store]
})


export class HomeComponent implements OnInit {

  @Select(KafkaState.messages) kafkaMessages$!: Observable<string[]>;


  constructor(private store:Store) { }


  ngOnInit() {
    this.store.dispatch(new ConnectWebSocket())
  }

}
