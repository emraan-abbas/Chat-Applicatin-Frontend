import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {


  detail:any = localStorage.getItem('userDetails');
  id:any = this.detail ? JSON.parse(this.detail)._id : "";

  newMessage: string | any;
  messageList: any[] = [];

  pastMessages: object | any;

  constructor(private chatService: ChatService) { }
 
  ngOnInit(): void {
      this.chatService.getNewMessage().subscribe((data: any) => {
        this.messageList.push({message: data.message, name: data.name});//, name:'test'
    });
    this.getMessages()
  };

  sendMessage() {
    this.chatService.sendMessage({message: this.newMessage, senderId:this.id});
    this.newMessage = '';
  };

  getMessages() {
    this.chatService.getMessagesService().subscribe(res => {
      this.pastMessages = res;
      this.pastMessages.map((pm: { message: any, senderId: any })=>{
        this.messageList.push({message: pm.message, name:  pm.senderId.name})
      })
      console.log("PAST MESSAGES = ",this.pastMessages);
    })
  };

}
