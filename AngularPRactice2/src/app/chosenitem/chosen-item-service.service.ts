import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError, concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChosenItemServiceService {
  handleError(task: string, object: any) {
    return object;
  }
  private itemComments: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  public getComments(itemId: number): Observable<any[]> {
    console.log('itemID from chosen item service');
    console.log(itemId);
    this.http.get<any>('/api/getComments/' + itemId).subscribe((comments) => {
      this.itemComments.next(comments);
    });
    return this.itemComments.asObservable();
  }

  public getComments2(itemId: number): Observable<any[]> {
    this.getComments(itemId);
    return this.itemComments;
  }

  submitComment(info: any) {
    this.http
      .post<any>('/api/postComment', info)
      .pipe(
        catchError((error: any) => {
          console.log('Oops! Something went wrong:', error.message);
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

  submitLikes(info: any) {
    return this.http
      .post<any>('/api/createLikes', info)
      .pipe(
        catchError((error: any) => {
          console.log('Oops! Something went wrong:', error.message);
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

  submitBid(info: any) {
    console.log(info)
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
      return this.http.put<any>('/api/updateBids/' + info.itemId, info).pipe(
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

    // addHero(hero: Hero): Observable<Hero> {
  //   return this.http
  //     .post<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(catchError(this.handleError('addHero', hero)));
  // }
}

