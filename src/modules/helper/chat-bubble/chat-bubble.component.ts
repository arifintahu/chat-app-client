import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css']
})
export class ChatBubbleComponent implements OnInit {
    @Input() name: string;
    @Input() msg: string;
    @Input() isme: string;
    constructor() { }
    ngOnInit() {
    }
}
