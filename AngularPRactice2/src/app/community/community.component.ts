import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import {
  Observable,
  BehaviorSubject,
  catchError,
  throwError,
  concatMap,
} from 'rxjs';

@Component({
  selector: 'bot-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent {
  public userItems: any[] = [];
  currentUser: any = {};
  filter: string = '';

  getUserItems(userId: number) {
    console.log("getting the user's items");
    console.log(userId);

    this.http
      .get<any[]>('/api/userItems/' + userId)
      // .pipe(
      //   catchError((error: any) => {
      //     console.log(
      //       'Oops! Something went wrong signing up the user:',
      //       error.message
      //     );
      //     return throwError(
      //       'Oh, my dear, there was an error while submitting your data. Please try again later.'
      //     );
      //   })
      // )
      .subscribe({
        next: (items) => {
          console.log(items);
          this.userItems = items;
        },
      });
  }

  constructor(
    private route: ActivatedRoute,
    private homeSV: HomeService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.homeSV.getCurrentUser().subscribe((user) => {
      console.log(user);
      console.log('comminity page');
      this.currentUser = user;
    });
    // this.filter=this.route.snapshot.params['filter'];
    console.log('oninit communitry');
    this.route.params.subscribe((params) => {
      this.filter = params['filter'] ?? 'no params';
    });

    this.getUserItems(parseInt(this.filter));
  }

  setChosenItem(number: number) {
    console.log('setting chosen Item ');
    console.log(number);
    console.log(this.userItems[number]);
    this.homeSV.turnOnItemModal();
    this.homeSV.setChosenItem(this.userItems[number]);
  }

  submitLike(
    itemindex: number,
    like: number,
    itemId: number,
    itemUserId: number
  ) {
    this.homeSV.setCurrentUser({
      username: this.currentUser.username,
      points: this.currentUser.points - 1,
      id: this.currentUser.id,
    });

    let tempFav: any[] = this.userItems;
    tempFav[itemindex].likes = like + 1;
    this.homeSV.setFavs(tempFav);
    //update likes on item
    this.homeSV.submitLike(
      like,
      itemId,
      itemUserId,
      this.currentUser.id,
      this.currentUser.points - 1
    );
  }
}
