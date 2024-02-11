import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { IProduct } from 'src/app/catalog/product.model';
import { Observable } from 'rxjs';
import { HomeService } from '../home.service';
import { Item } from '../item.model';
import { CommonModule } from '@angular/common';
import { ItemSubmitComponent } from '../item-submit/item-submit.component';
import { NgClass, NgIf } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';


@Component({
  selector: 'bot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,

    ItemSubmitComponent,
    CommonModule,
    NgIf,
    NgClass,
  ],
})
export class HomeComponent {
  @Input() FavItems: any[] = [];
  @Input() TopComments: any[] = [];
  @Input() currentUser: any = {};

  public cardMoveActivation: boolean[] = [];

  private scrollTrigger = 'on';

  public randomNumber = 2;

  public heartTop: boolean[] = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ];

  public heartClickTrigger: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  newTitleColors2: string[] = [
    'orange',
    'rgb(244, 170, 42)',
    'rgb(255, 10, 247)',
    'rgb(204, 255, 51)',
    'rgb(242, 115, 208)',
    'rgb(255, 51, 0)',
  ];

  heartColors: string[] = [
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
    'orange',
  ];

  public heartClick(i: number) {
    console.log('heart click');
    this.heartClickTrigger[i] = true;
    setTimeout(() => {
      this.heartClickTrigger[i] = false;
    }, 450);
  }
  

  heartChangeColor(i: number) {
    // console.log('mouseover' + i);
    // if (this.heartTop[i] == true) {
    //   this.heartTop[i] = false;
    // } else {
    //   this.heartTop[i] = true;
    // }
    // console.log(this.heartTop);
    let randomNumber = Math.floor(Math.random() * this.newTitleColors2.length);
    var titleColor = this.newTitleColors2[randomNumber];
    this.heartColors[i] = titleColor;
  }
  submitLike(
    itemindex: number,
    like: number,
    itemId: number,
    itemUserId: number
  ) {

    
    this.heartClick(itemindex);
    if(itemUserId !== this.currentUser.id){
    this.HomeSvc.setCurrentUser({
      username: this.currentUser.username,
      points: this.currentUser.points - 1,
      id: this.currentUser.id,
    }); 

    let tempFav: any[] = this.FavItems;
    tempFav[itemindex].likes = like + 1;
    this.HomeSvc.setFavs(tempFav);
    //update likes on item
    this.HomeSvc.submitLike(
      like,
      itemId,
      itemUserId,
      this.currentUser.id,
      this.currentUser.points
    );
  }
}
  changeUser(newName: any) {
    console.log('newname');
    console.log(newName);
    this.currentUser.username = newName;
  }

  constructor(private HomeSvc: HomeService) {
    console.log('HOME');
    console.log(this.FavItems);
  }
  setUser(number: number) {
    this.HomeSvc.setCurrentUser(this.FavItems[number]);
    this.HomeSvc.turnOnItemModal();
  }

  setChosenItem(number: number) {
    console.log('setting chosen Item ');
    console.log(number);
    console.log(this.FavItems[number]);
    this.HomeSvc.turnOnItemModal();
    this.HomeSvc.setChosenItem(this.FavItems[number]);
  }

  favsOnScroll() {
    console.log('onscroll');
    if (this.scrollTrigger == 'on') {
      for (let i = 0; i < this.cardMoveActivation.length; i++) {
        let randomNumber: number = Math.floor(Math.random() * 10);
        if (randomNumber >= 6) {
          this.cardMoveActivation[i] = true;
          setTimeout(() => {
            this.cardMoveActivation[i] = false;
          }, 600);
        }
        this.scrollTrigger = 'off';
        setTimeout(() => {
          this.scrollTrigger = 'on';
        }, 300);
      }
    }
  }

  ngOnInit() {
    this.HomeSvc.getCurrentUser().subscribe((user) => {
      console.log(user);
      this.currentUser = user;
    });
    console.log('home');
    this.HomeSvc.getFavs().subscribe((FavItems) => {
      console.log(FavItems);
      this.FavItems = FavItems;
      for (let i = 0; i < FavItems.length; i++) {
        this.cardMoveActivation.push(false);
      }
    });

    this.HomeSvc.getNumber().subscribe((number) => {
      console.log(number);
      this.randomNumber = number;
    });

    this.HomeSvc.getTopComments().subscribe((topComments) => {
      console.log(topComments);
      this.TopComments = topComments;
    });

    // this.route.queryParams.subscribe((params) => {
    //   this.filter = params['filter'] ?? '';
    // })
  }

  updateCommentLikes(i: number) {
    if(this.currentUser.id !== this.TopComments[i].userId){

    
    
    this.HomeSvc.setCurrentUser({
      username: this.currentUser.username,
      points: this.currentUser.points - 1,
      id: this.currentUser.id,
    });

    let tempComments: any[] = this.TopComments;
    tempComments[i].votes += 1;
    this.HomeSvc.setTopComments(tempComments);
    // console.log("likedcomment" + i)

    this.HomeSvc.submitCommentVotes(
      i,
      this.currentUser.id,
      this.currentUser.points
    );
  }
}
}
