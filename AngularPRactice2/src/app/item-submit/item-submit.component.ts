import { Component, Input,OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { HomeService } from '../home.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-submit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-submit.component.html',
  styleUrls: ['./item-submit.component.css'],
})
export class ItemSubmitComponent {
  warnMessageItem: any = {
    message: '',
  };

  public createdItem: any = {
    name: '',
    url1: '',
    url2: '',
    url3: '',
    story:''
  };

  @Input() currentUser: any = {};

  @Output() changeUserEvent = new EventEmitter<any>();

  changeUser(value: string) {
    console.log(value);
    console.log('changeuser');
    this.changeUserEvent.emit(value);
  }

  createItem(e:any){
    console.log("creating Item")
    e.stopPropagation();
    e.preventDefault();
    this.homeSvc.createItem(this.createdItem)

  

  }

  constructor(private homeSvc :HomeService) {
    // this.changeUser("something Other")
  }

  ngOnInit() {
    // console.log("child init")
    //     this.changeUser("something Other")
  }
}
