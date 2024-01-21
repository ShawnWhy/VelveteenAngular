import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private chosenItemState: BehaviorSubject<string> =
    new BehaviorSubject<string>('on');
  private currentUser: BehaviorSubject<any> = new BehaviorSubject<any>({
    userName: 'Guest',
    points: 20,
    id: 0,
  });

  private Favs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private TopComments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private randomNumber: BehaviorSubject<number> = new BehaviorSubject<number>(
    3
  );

  constructor(private http: HttpClient) {
    // this.http.post<any>('/')


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
    this.currentUser = user;
  }
  setNumber(number: number) {
    this.randomNumber.next(number);
  }

  getNumber() {
    return this.randomNumber.asObservable();
  }
  getFavs(): Observable<any[]> {
    return this.Favs.asObservable();
  }

  getTopComments(): Observable<any[]> {
    return this.TopComments.asObservable();
  }

  getItemModalState(): Observable<string> {
    return this.chosenItemState.asObservable();
  }

  turnOffItemModal() {
    console.log("turning off modal....")
    this.chosenItemState.next('off');
  }
  turnOnItemModal() {
    this.chosenItemState.next('on');
  }

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
