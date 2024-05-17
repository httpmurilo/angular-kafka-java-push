import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { KafkaState } from './app/state/kafka.state'; // Importe o estado corretamente
import { importProvidersFrom } from '@angular/core';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      NgxsModule.forRoot([KafkaState]),
      NgxsWebsocketPluginModule.forRoot({
        url: 'ws://localhost:8080/websocket'
      })
    ),
    provideRouter([]) 
  ]
}).catch(err => console.error(err));
