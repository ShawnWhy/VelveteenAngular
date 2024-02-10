import { ChangeDetectorRef, OnChanges, Component } from '@angular/core';
import { Router } from '@angular/router';
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

  public itemPositions: any = { x: 12, y: 200 };

  public userItemPositions: any[] = [];

  submitDecoration(event: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log('submitting decoration');
    let userId = this.currentUser.id;
    let decoration = JSON.stringify({ decoration: this.userItemPositions });
    let newDecoration = {
      userId: userId,
      decoration: decoration,
    };
    console.log('this is the new decoration');
    console.log(newDecoration);

    this.http
      .put<any>('/api/create_decoration', newDecoration)
      .pipe(
        catchError((error: any) => {
          console.log(
            'Oops! Something went wrong signing up the user:',
            error.message
          );
          return throwError(
            'Oh, my dear, there was an error while submitting your data. Please try again later.'
          );
        })
      )
      .subscribe((response: any) => {
        console.log(
          'Congratulations, my love! Your data was successfully submitted:',
          response
        );
      });
  }

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

          if (this.userItemPositions.length == 0) {
            console.log('nolength');
            for (let i = 0; i < items.length; i++) {
              this.userItemPositions.push([i * 20, i * 20]);
            }
          } else if (items.length > this.userItemPositions.length) {
            console.log('short+++++++++++');
            let extra = items.length - this.userItemPositions.length;

            for (let i = 0; i < extra; i++) {
              this.userItemPositions.push([i * 20, i * 20]);
            }
          } else {
            return;
          }
        },
      });
  }

  public selectedCard: number | null = null;

  selectCard(index: number) {
    console.log('clicked card');
    console.log(index);
    this.selectedCard = index;
  }

  dropCard(event: any) {
    console.log('droppingcard');
    console.log(event.target.id);

    if (event.target.id === 'myTackBoard') {
      this.selectedCard = null;
    }
  }
  moveCard(event: MouseEvent) {
    //  this.changeDetectorRef.detectChanges();
    // console.log("movingcard")
    // console.log(this.selectedCard)
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    // console.log(mouseX)
    // console.log(mouseY)
    if (this.selectedCard !== null) {
      //  this.itemPositions.x= mouseX;
      //  this.itemPositions.y = mouseY;
      this.userItemPositions[this.selectedCard][0] = mouseX + 10;
      this.userItemPositions[this.selectedCard][1] = mouseY + 10;
      // console.log(this.userItemPositions);
    }

    // Now you can use the mouseX and mouseY variables as you desire.
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
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

    this.http.get<any>('/api/my_decoration/' + this.filter).subscribe({
      next: (decoration) => {
        console.log('only for decoration');
        console.log(decoration);
        if (!decoration.decoration) {
          console.log('decoration has no ');
          // return;
        } else {
          console.log('gotten stuff grom decoration');
          let tempUserItemPositions = decoration;
          console.log(tempUserItemPositions);
          tempUserItemPositions = JSON.parse(tempUserItemPositions.decoration);
          this.userItemPositions = tempUserItemPositions.decoration;
          console.log(this.userItemPositions);
        }
      },
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
