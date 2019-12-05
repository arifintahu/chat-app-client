import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewModule } from '../modules/views/view.module';
import { ChatService } from '../modules/views/chat/chat.service';
import { WebsocketService } from '../modules/views/chat/websocket.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewModule
  ],
  providers: [
    ChatService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
