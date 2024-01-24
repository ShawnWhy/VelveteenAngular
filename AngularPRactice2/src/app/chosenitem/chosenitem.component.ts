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

  submitLike(
    like: number,
    itemId: number,
    itemUserId: number,
    myUserId: number,
    myPoints: number
  ) {
    //update likes on item
    this.homeSvc.submitLike(
      like,
      itemId,
      itemUserId,
      this.currentUser.id,
      this.currentUser.points - 1
    );
  }
  public submitComment(comment: string) {
    this.ChosSvc.submitComment({
      comment: comment,
      itemId: this.chosenItem.id,
      userName: this.currentUser.name,
      votes: 0,
      userId: this.currentUser.id,
    });
  }

  public submitBid() {
    this.ChosSvc.submitBid({
      bidAmount: this.bid,
      itemId: this.chosenItem.id,
      userName: this.currentUser.name,
      userId: this.currentUser.id,
    });
  }
  public turnoffModal(e: any) {
    console.log('turnoffmodal');
    this.homeSvc.turnOffItemModal();
  }

  constructor(
    private homeSvc: HomeService,
    private ChosSvc: ChosenItemServiceService
  ) {}

  ngOnInit() {
    console.log('this.currentUser' + this.currentUser.userName);
    console.log('this.chosenitem.id' + this.chosenItem.id);
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
