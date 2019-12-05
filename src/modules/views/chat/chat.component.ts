import { Input, Directive, Renderer2,
  ViewChild, ElementRef, Component, OnInit, Inject, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{
  @Input() groupname : string;
  message = '';
  user_id = '';
  group_id = '';
  @ViewChild('div',  { static: true}) private div: ElementRef;
  @ViewChild('divMsg',  { static: true}) private divMsg: ElementRef;
  
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private chat: ChatService
  ){ }

  ngOnInit(){
    const userData = JSON.parse(localStorage.getItem('user'));
    const groupData = JSON.parse(localStorage.getItem('group'));
    if(!userData || !groupData){
      this.router.navigate(['']);
    }else{
      this.groupname = groupData.groupname;
      this.user_id = userData._id;
      this.group_id = groupData._id;
      this.chat.messages.subscribe( (msg) => {
        console.log(JSON.parse(msg));
      });
    }
    
  }


  typeMsg(event: any) {
    this.message = event.target.value;
  }

  sendMsg() {
    if(this.message != ''){
      this.chat.sendMsg({
        user_id : this.user_id,
        group_id : this.group_id,
        message : this.message
      });
      this.addChat(this.message);
    }
  }

  addChat(message){
    const chatContent = this.renderer.createElement('div');
    const chatName = this.renderer.createElement('div');
    const chatMsg = this.renderer.createElement('div');
    this.renderer.addClass(chatContent, 'chat-content');
    this.renderer.addClass(chatName, 'chat-name');
    this.renderer.addClass(chatMsg, 'chat-msg');
    const chatNameText = this.renderer.createText('Me');
    const chatMsgText = this.renderer.createText(`${message}`);
    this.renderer.appendChild(chatName, chatNameText);
    this.renderer.appendChild(chatMsg, chatMsgText);
    this.renderer.setStyle(chatName, 'text-align', 'right');
    this.renderer.setStyle(chatMsg, 'background', '#43e66c');
    this.renderer.setStyle(chatMsg, 'padding', '8px');
    this.renderer.setStyle(chatMsg, 'border-radius', '8px');
    this.renderer.setStyle(chatMsg, 'display', 'inline-block');
    this.renderer.appendChild(chatContent, chatName);
    this.renderer.appendChild(chatContent, chatMsg);
    this.renderer.setStyle(chatContent, 'margin-bottom', '10px');
    this.renderer.setStyle(chatContent, 'clear', 'both');
    this.renderer.setStyle(chatContent, 'float', 'right');
    this.renderer.appendChild(this.div.nativeElement, chatContent);
    this.message = '';
    this.divMsg.nativeElement.value = '';
  }
}


//https://www.syntaxsuccess.com/viewarticle/socket.io-with-rxjs-in-angular-2.0