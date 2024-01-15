import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { IProduct } from '../catalog/product.model';
import { Item } from '../item.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private Favs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private TopComments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  constructor(private http: HttpClient) {

    
    this.http.get<any>('/api/getFavs')
    .subscribe({
      next: (items) => {
        // console.log(cart);
        this.Favs.next(items)
      }
        ,
    });

      this.http.get<any>('/api/getTopComments')
    .subscribe({
      next: (items) => {
        // console.log(cart);
        this.TopComments.next(items)
      }
        ,
    });
  }

  getFavs(): Observable<any[]> {
    return this.Favs.asObservable();
  }

  getTopComments(): Observable<any[]> {
    return this.Favs.asObservable();
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
