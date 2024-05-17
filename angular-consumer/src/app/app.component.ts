import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { KafkaState } from './state/kafka.state';
import { provideRouter } from '@angular/router'; // Certifique-se de configurar o roteamento se necessário

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrigido 'styleUrl' para 'styleUrls'
})
export class AppComponent {
  title = 'angular-consumer';
}
