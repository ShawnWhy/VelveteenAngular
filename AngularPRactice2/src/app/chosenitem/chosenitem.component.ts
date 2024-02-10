import { Component,Input,OnInit,Output, EventEmitter } from '@angular/core';
import { HeartComponent } from '../heart/heart.component';
import { HomeService } from '../home.service';
import { ChosenItemServiceService } from './chosen-item-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bot-chosenitem',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chosenitem.component.html',
  styleUrls: ['./chosenitem.component.css'],
})
export class ChosenitemComponent {
  @Input() currentUser: any = {};
  @Input() chosenItem: any = {};
  public itemComments: any[] = [];
  public bid: number = 0;

  moveItemLeft() {
    let tempItemImage = this.chosenItem.imageNumber;
    tempItemImage--;
    if (tempItemImage < 0) {
      tempItemImage = 2;
    }
    this.chosenItem.imageNumber = tempItemImage;
  }

  public bidOpen: boolean = false;

  openBid() {
    if (this.bidOpen) {
      this.bidOpen = false;
    } else {
      this.bidOpen = true;
    }
  }
  moveItemRight() {
    let tempItemImage = this.chosenItem.imageNumber;
    tempItemImage++;
    if (tempItemImage > 2) {
      tempItemImage = 0;
    }
    this.chosenItem.imageNumber = tempItemImage;
  }
  submitLike(
    like: number,
    itemId: number,
    itemUserId: number,
    myUserId: number,
    myPoints: number
  ) {
    if (itemUserId == 0) {
      console.log('this item is created by the guest user');
      return;
    }
    //update likes on item
    this.homeSvc.submitLike(
      like,
      itemId,
      itemUserId,
      this.currentUser.id,
      this.currentUser.points - 1
    );
  }
  public submitComment(e: any) {
    e.stopPropagation();
    e.preventDefault();
    let newComment = {
      comment: this.newComment,
      itemId: this.chosenItem.id,
      userName: this.currentUser.username,
      votes: 0,
      userId: this.currentUser.id,
    };
    console.log(newComment);
    this.itemComments.push(newComment);
    this.ChosSvc.submitComment(newComment);
  }

  public submitBid() {
    if (this.chosenItem.userId == 0) {
      console.log('either you are the user or the item is created by the user');
      return;
    }
    this.ChosSvc.submitBid({
      bidAmount: this.bid,
      itemId: this.chosenItem.id,
      userName: this.currentUser.username,
      userId: this.currentUser.id,
    });
  }
  public commentsSwitch: boolean = false;
  public turnComments() {
    if (this.commentsSwitch) {
      this.commentsSwitch = false;
    } else {
      this.commentsSwitch = true;
    }
  }
  public turnoffModal(e: any) {
    console.log('turnoffmodal');
    this.homeSvc.turnOffItemModal();
  }

  constructor(
    private homeSvc: HomeService,
    private ChosSvc: ChosenItemServiceService
  ) {}

  public newComment: string = '';

  ngOnInit() {
    console.log('this.currentUser' + this.currentUser.username);
    console.log('this.chosenitem.id' + this.chosenItem.id);
  }

  openComments() {
    this.turnComments();
    console.log('sdsdsds');
    this.ChosSvc.getComments(this.chosenItem.id).subscribe((comments) => {
      this.itemComments = comments;
    });
  }

  // @Output() changeUserEvent = new EventEmitter<any>();

  // changeUser(value: string) {
  //   console.log(value);
  //   console.log('changeuser');
  //   this.changeUserEvent.emit(value);
  // }
}
