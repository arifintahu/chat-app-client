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
      this.reloadChat();
      this.chat.messages.subscribe( async (msg) => {
        let data = JSON.parse(msg);
        console.log(data);
        this.applyChat(data);
      });
    }
    
  }

  typeMsg(event: any) {
    this.message = event.target.value;
  }

  async applyChat(data){
    if(this.isGroupSame(data.group_id)){
        if(this.isMe(data.user_id)){
          this.addChatMe(data.message);
        }else{
          const response = await fetch(`http://chat-app-server-2.herokuapp.com/users/${data.user_id}`, {
            method : 'GET',
            headers : {
              'Content-Type': 'application/json'
            }
          });
          const json = await response.json();
          if(json.ok){
            this.addChat(data.message, json.data.firstname, json.data.lastname);
          }
        }
      }
  }

  async sendMsg() {
    if(this.message != ''){
      const response = await fetch('http://chat-app-server-2.herokuapp.com/messages', {
        method : 'POST',
        body : JSON.stringify({
          group_id : this.group_id,
          user_id : this.user_id,
          message : this.message
        }),
        headers : {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      if (json.ok) {
        this.chat.sendMsg({
          user_id : this.user_id,
          group_id : this.group_id,
          message : this.message
        });
      } else {
         console.log(`${json.msg}`);
      }
    }else{
      console.log('message must be filled');
    }
  }

  addChatMe(message){
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

  addChat(message, firstname, lastname){
    const chatContent = this.renderer.createElement('div');
    const chatName = this.renderer.createElement('div');
    const chatMsg = this.renderer.createElement('div');
    this.renderer.addClass(chatContent, 'chat-content');
    this.renderer.addClass(chatName, 'chat-name');
    this.renderer.addClass(chatMsg, 'chat-msg');
    const chatNameText = this.renderer.createText(`${firstname} ${lastname}`);
    const chatMsgText = this.renderer.createText(`${message}`);
    this.renderer.appendChild(chatName, chatNameText);
    this.renderer.appendChild(chatMsg, chatMsgText);
    this.renderer.setStyle(chatName, 'text-align', 'left');
    this.renderer.setStyle(chatMsg, 'background', '#9fbad6');
    this.renderer.setStyle(chatMsg, 'padding', '8px');
    this.renderer.setStyle(chatMsg, 'border-radius', '8px');
    this.renderer.setStyle(chatMsg, 'display', 'inline-block');
    this.renderer.appendChild(chatContent, chatName);
    this.renderer.appendChild(chatContent, chatMsg);
    this.renderer.setStyle(chatContent, 'margin-bottom', '10px');
    this.renderer.setStyle(chatContent, 'clear', 'both');
    this.renderer.setStyle(chatContent, 'float', 'left');
    this.renderer.appendChild(this.div.nativeElement, chatContent);
    this.message = '';
    this.divMsg.nativeElement.value = '';
  }

  isGroupSame(value){
    if(value == this.group_id){
      return true;
    }else{
      return false;
    }
  }

  isMe(value){
    if(value == this.user_id){
      return true;
    }else{
      return false;
    }
  }

  async reloadChat(){
    const response = await fetch(`http://chat-app-server-2.herokuapp.com/messages`, {
      method : 'GET',
      headers : {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if(json.ok){
      json.data.map((value) => {
        this.applyChat(value);
      });
    }
  }
}
