import { Component, Input,OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-submit',
  standalone: true,
  imports: [],
  templateUrl: './item-submit.component.html',
  styleUrls: ['./item-submit.component.css']
})
export class ItemSubmitComponent {
  warnMessageItem :any = {
    message:""
  }

  @Input() userProfile:any = {};

  @Output() changeUserEvent = new EventEmitter<any>();

   changeUser(value: string) {
    console.log(value)
    console.log("changeuser")
    this.changeUserEvent.emit(value);
  }

  constructor(){
    // this.changeUser("something Other")
  }
  
  ngOnInit(){
    // console.log("child init")
    //     this.changeUser("something Other")

  }
}
