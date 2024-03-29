import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  catchError,
  throwError,
  concatMap,
} from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private chosenItemState: BehaviorSubject<string> =
    new BehaviorSubject<string>('off');
  private currentUser: BehaviorSubject<any> = new BehaviorSubject<any>({
    username: 'Guest',
    points: 20,
    id: 0,
  });

  private chosenItem: BehaviorSubject<any> = new BehaviorSubject<any>({
    highestBid: 200000000,
    id: 3,
    imageUrl1: 'https://i.imgur.com/hpTkbNy.jpg',
    imageUrl2: 'https://i.imgur.com/3iix37r.jpg',
    imageUrl3: 'https://i.imgur.com/MCmdtIt.jpeg',
    itemStory: 'once he took a ferry to the netherlands',
    likes: 229,
    name: 'Borishka',
    imageArray :[],

    userId: 3,
  });


  private Favs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private TopComments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private randomNumber: BehaviorSubject<number> = new BehaviorSubject<number>(
    3
  );

  constructor(private http: HttpClient) {
    // this.http.post<any>('/')


    // .pipe(
    //     catchError((error: any) => {
    //       console.log('Oops! Something went wrong 0:', error.message);
    //       return throwError(
    //         'Oh, my dear, there was an error while submitting your data. Please try again later.'
    //       );
    //     }),
    //     concatMap((response: any) => {
    //       console.log(response);
    //       console.log(response.points);
    //       return this.http
    //         .put<any>('/api/changePoints/' + itemUserId, {
    //           points: response.points + 1,
    //         })
    //         .pipe(
    //           catchError((error: any) => {
    //             console.log('Oops! Something went wrong 1:', error.message);
    //             return throwError(
    //               'Oh, my dear, there was an error while submitting your data. Please try again later.'
    //             );
    //           })

    this.http.get<any>('/api/user_data')
    .subscribe({
      next: (user) => {
        console.log("user is here!!!")
        console.log(user)
        if(!user.id){
          user = {
            username: 'Guest',
            points: 20,
            id: 0,
          };
        }
        this.currentUser.next(user);
        this.http
          .get<any>('/api/getPoints/' + this.currentUser.value.id)
          .subscribe({
            next: (point) => {
              console.log(this.currentUser.value.id);

              console.log('gotten points from the database');
              console.log(point);
              this.currentUser.value.points = point.points;
            },
          }); 
      },
    });
    
    this.http.get<any>('/api/getFavs').subscribe({
      next: (items) => {
        // console.log(cart);
        this.Favs.next(items);
      },
    });

    this.http.get<any>('/api/getTopComments').subscribe({
      next: (items) => {
        // console.log(cart);
        this.TopComments.next(items);
      },
    });
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  setCurrentUser(user: any) {
    this.currentUser.next(user);
  }
  setNumber(number: number) {
    this.randomNumber.next(number);
  }
  setChosenItem(item: any) {
    console.log('setchoseinITem2');
    console.log(item);
    item.imageNumber = 0;
    item.imageArray = [
      item.imageUrl1,
      item.imageUrl2,
      item.imageUrl3
    ]
    this.chosenItem.next(item);
  }
  getNumber() {
    return this.randomNumber.asObservable();
  }
  getFavs(): Observable<any[]> {
    return this.Favs.asObservable();
  }

  setFavs(items: any[]) {
    this.Favs.next(items);
  }
  getChosenItem(): Observable<any> {
    return this.chosenItem.asObservable();
  }

  setTopComments(comments:any[]){
    this.TopComments.next(comments);
  }

  getTopComments(): Observable<any[]> {
    return this.TopComments.asObservable();
  }

  getItemModalState(): Observable<string> {
    return this.chosenItemState.asObservable();
  }

  turnOffItemModal() {
    console.log('turning off modal....');
    this.chosenItemState.next('off');
  }
  turnOnItemModal() {
    this.chosenItemState.next('on');
  }

  signUp(credentials: any) {
    this.http
      .post<any>('/api/signUp', credentials)
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
        window.location.reload();
        console.log(
          'Congratulations, my love! Your data was successfully submitted:',
          response
        );
      });
  }

  login(credentials: any) {
    this.http
      .post<any>('/api/login', credentials)
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
        window.location.reload();
        console.log(
          'Congratulations, my love! Your data was successfully submitted:',
          response
        );
      });
  }

  signOut() {
    this.http
      .get<any>('/api/logout')
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

  createItem(item: any) {
    console.log('creatingItem');
    console.log(item);
    console.log(this.currentUser.value.id);
    let newItem: any = {
      userId: this.currentUser.value.id,
      name: item.name,
      itemStory: item.story,
      url1: item.url1,
      url2: item.url2,
      url3: item.url3,
      mocelUrl: item.modelUrl,
    };
    return this.http
      .post<any>('/api/createItem', newItem)
      .pipe(
        catchError((error: any) => {
          console.log(
            'Oops! Something went wrong creating the item:',
            error.message
          );
          return throwError(
            'Oh, my dear, there was an error while submitting your data. Please try again later.'
          );
        })
      )
      .subscribe((response: any) => {
        window.location.reload();
        console.log(
          'Congratulations, my love! Your data was successfully submitted:',
          response
        );
      });
  }

  submitLike(
    like: number,
    itemId: number,
    itemUserId: number,
    myUserId: number,
    myUserPoints: number
  ) {

 
    console.log('submitlike');
    console.log(like);
    console.log(itemId);
    console.log;
    return this.http
      .get<any>('/api/getPoints/' + itemUserId)
      .pipe(
        catchError((error: any) => {
          console.log('Oops! Something went wrong 0:', error.message);
          return throwError(
            'Oh, my dear, there was an error while submitting your data. Please try again later.'
          );
        }),
        concatMap((response: any) => {
          console.log(response);
          // console.log(response.points);
          return this.http
            .put<any>('/api/changePoints/' + itemUserId, {
              points: response.points + 1,
            })
            .pipe(
              catchError((error: any) => {
                console.log('Oops! Something went wrong 1:', error.message);
                return throwError(
                  'Oh, my dear, there was an error while submitting your data. Please try again later.'
                );
              }),
              concatMap((response: any) => {
                return this.http
                  .put<any>('/api/changePoints/' + myUserId, {
                    points: myUserPoints,
                  })
                  .pipe(
                    catchError((error: any) => {
                      console.log(
                        'Oops! Something went wrong 2:',
                        error.message
                      );
                      return throwError(
                        'Oh, my dear, there was an error while submitting your data. Please try again later.'
                      );
                    }),
                    concatMap((response: any) => {
                      console.log("updating likes ")
                      console.log(like);
                      return this.http
                        .put<any>('/api/updateLikes/' + itemId, {
                          likes: like + 1,
                        })
                        .pipe(
                          catchError((error: any) => {
                            console.log(
                              'Oops! Something went wrong 3:',
                              error.message
                            );
                            return throwError(
                              'Oh, my dear, there was an error while submitting your data. Please try again later.'
                            );
                          })
                        );
                    })
                  );
              })
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

  // updateCommentLikes(i: number) {
  //   let tempComments = this.TopComments.value[i].id;
  //   console.log(tempComments);
  //   // let tempId = tempComments[i]
  // }

  submitCommentVotes(
    i:number,
    myUserId: number,
    myUserPoints: number
  ) {
      let tempComments = this.TopComments.value[i];
      console.log(tempComments);
      let commentId = tempComments.id;
      let commentUserId = tempComments.userId;
      let vote = tempComments.votes;


    console.log('submitVotes');
    console.log(vote);
    console.log(myUserPoints)
    console.log(commentUserId);
    console.log(myUserId)
    console.log;
    return this.http
      .get<any>('/api/getPoints/' + commentUserId)
      .pipe(
        catchError((error: any) => {
          console.log('Oops! Something went wrong 0:', error.message);
          return throwError(
            'Oh, my dear, there was an error while submitting your data. Please try again later.'
          );
        }),
        concatMap((response: any) => {
          console.log(response);
          console.log(response.points);
          return this.http
            .put<any>('/api/changePoints/' + commentUserId, {
              points: response.points + 1,
            })
            .pipe(
              catchError((error: any) => {
                console.log('Oops! Something went wrong 1:', error.message);
                return throwError(
                  'Oh, my dear, there was an error while submitting your data. Please try again later.'
                );
              }),
              concatMap((response: any) => {

                console.log("updated the other user's points")
                console.log(myUserPoints);
                console.log(myUserId)
                return this.http
                  .put<any>('/api/changePoints/' + myUserId, {
                    points: myUserPoints,
                  })
                  .pipe(
                    catchError((error: any) => {
                      console.log(
                        'Oops! Something went wrong 2:',
                        error.message
                      );
                      return throwError(
                        'Oh, my dear, there was an error while submitting your data. Please try again later.'
                      );
                    }),
                    concatMap((response: any) => {
                      return this.http
                        .put<any>('/api/updateCommentVotes/' + commentId, {
                          votes: vote,
                        })
                        .pipe(
                          catchError((error: any) => {
                            console.log(
                              'Oops! Something went wrong 3:',
                              error.message
                            );
                            return throwError(
                              'Oh, my dear, there was an error while submitting your data. Please try again later.'
                            );
                          })
                        );
                    })
                  );
              })
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

  submitBid(info: any) {
    console.log(info);
    return this.http
      .post<any>('/api/createBid', info)
      .pipe(
        catchError((error: any) => {
          console.log('Oops! Something went wrong:', error.message);
          return throwError(
            'Oh, my dear, there was an error while submitting your data. Please try again later.'
          );
        }),
        concatMap((response: any) => {
          console.log(response);
          return this.http
            .put<any>('/api/updateBids/' + info.itemId, info)
            .pipe(
              catchError((error: any) => {
                console.log('Oops! Something went wrong:', error.message);
                return throwError(
                  'Oh, my dear, there was an error while submitting your data. Please try again later.'
                );
              })
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

  // updateCommentLikes(i: number) {
  //   let tempComments = this.TopComments.value[i].id;
  //   console.log(tempComments);
  //   // let tempId = tempComments[i]
  // }
  // add(product: Item) {
  //   const newCart = [...this.cart.getValue(), product];
  //   this.cart.next(newCart);
  //   this.http.post('/api/cart', newCart).subscribe(() => {
  //     console.log('added ' + product.name + ' to cart!');
  //   });
  // }

  // remove(product: Item) {
  //   let newCart = this.cart.getValue().filter((i) => i !== product);
  //   this.cart.next(newCart);
  //   this.http.post('/api/get', newCart).subscribe(() => {
  //     console.log('removed ' + product.name + ' from cart!');
  //   });
  // }
}
