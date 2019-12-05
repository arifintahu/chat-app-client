import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { ChatComponent } from './chat/chat.component';
import { ChatBubbleComponent } from '../helper/chat-bubble/chat-bubble.component';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        GroupComponent,
        ChatComponent,
        ChatBubbleComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        RegisterComponent,
        LoginComponent,
        GroupComponent,
        ChatComponent,
        ChatBubbleComponent
    ],
    providers: []
})
export class ViewModule { }
