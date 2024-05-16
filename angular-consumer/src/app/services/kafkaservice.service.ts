import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { KafkaState } from '../state/kafka.state';
import { Observable } from 'rxjs/internal/Observable';
import { ConnectWebSocket } from '@ngxs/websocket-plugin';

@Injectable({
  providedIn: 'root'
})
export class KafkaserviceService {

  @Select(KafkaState.messages) kafkaMessages$: Observable<string[]>;
  
constructor(private store:Store) { }


  
  ngOnInit(){
    this.store.dispatch(new ConnectWebSocket())
  }

}

