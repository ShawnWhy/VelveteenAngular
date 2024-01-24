import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { IProduct } from 'src/app/catalog/product.model';
import { Observable } from 'rxjs';
import { HomeService } from '../home.service';
import { Item } from '../item.model';
import { CommonModule } from '@angular/common';
import { ItemSubmitComponent } from '../item-submit/item-submit.component';


@Component({
  selector: 'bot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [ItemSubmitComponent, CommonModule],
})
export class HomeComponent {
  @Input() FavItems: any[] = [];
  @Input() TopComments: any[] = [];
  @Input() currentUser: any = {};



  public randomNumber = 2;

  submitLike(
    itemindex: number,
    like: number,
    itemId: number,
    itemUserId: number
  ) {

    

    this.HomeSvc.setCurrentUser({
      userName: this.currentUser.userName,
      points: this.currentUser.points-1,
      id: this.currentUser.id,
    });

    let tempFav:any[] = this.FavItems
    tempFav[itemindex].likes = like+1
    this.HomeSvc.setFavs(tempFav)
    //update likes on item
    this.HomeSvc.submitLike(
      like,
      itemId,
      itemUserId,
      this.currentUser.id,
      this.currentUser.points - 1
    );
  }
  changeUser(newName: any) {
    console.log('newname');
    console.log(newName);
    this.currentUser.userName = newName;
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

  ngOnInit() {
    this.HomeSvc.getCurrentUser().subscribe((user) => {
      console.log(user);
      this.currentUser = user;
    });
    console.log('home');
    this.HomeSvc.getFavs().subscribe((FavItems) => {
      console.log(FavItems);
      this.FavItems = FavItems;
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
}
