import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private http: HttpClient) { }

    socket = io('http://localhost:3000');

  public sendMessage(dt: { message: any; senderId: any; }) {
    let data = localStorage.getItem('userDetails')
    let name = "anonymous user"
    if(data){
      name = JSON.parse(data).name
    }
    this.socket.emit('message', {name, message:dt.message, senderId: dt.senderId});
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };

  userNameService(name: any){
    return this.http.post("http://localhost:3000/user/post-user", name)
  };

  getMessagesService(){
    return this.http.get("http://localhost:3000/message/get-messages");
  };
}
