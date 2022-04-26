import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service'
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  NameValue: any;
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
  }

  getName(){
        this.chatService.userNameService({name: this.NameValue}).subscribe(
      (res:any) => {

          console.log(res);
          localStorage.setItem("userDetails", JSON.stringify(res))
          this.router.navigate(['/chat']);

      }
    )
  }
}
