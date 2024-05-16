import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { KafkaState } from './state/kafka.state'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'angular-consumer';

  constructor() {
    
    NgxsModule.forRoot([
      KafkaState
    ]);

    NgxsWebsocketPluginModule.forRoot({
      url: 'ws://localhost:8080/websocket'
    });

}
