import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeService } from './home.service';
import { ChosenitemComponent } from './chosenitem/chosenitem.component';
import { HomeComponent } from './home/home.component';
import { ItemSubmitComponent } from './item-submit/item-submit.component';
import { VelveteenHeaderComponent } from './velveteen-header/velveteen-header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ItemSubmitComponent,
    HomeComponent,
    VelveteenHeaderComponent,
    CommonModule,
    RouterOutlet,
    ChosenitemComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanvas', { static: false })
  canvasRef: any
  public context: any

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d');
    if (!this.context) {
      throw new Error('Unable to obtain 2D rendering context');
    }
    this.startAnimation();
  }

  startAnimation() {
    requestAnimationFrame(() => this.animate());
  }
  private i:number = 4
  animate() {
    // Clear canvas
    
    this.context.clearRect(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );

    // Draw your animated elements here
    // Example:
    this.context.fillStyle = '#FF0000';
     this.i++;
    this.context.fillRect(0, 0, this.i, this.canvasRef.nativeElement.height);
    if (this.i > this.canvasRef.nativeElement.width) {
      this.i = 0;
    }

    // Update animation state or draw new elements

    // Call next animation frame
    requestAnimationFrame(() => this.animate());
  }

  modalState: string = 'off';
  title = 'The Velveteen Exchange';
  FavItems: any[] = [];
  TopComments: any[] = [];
  currentUser: any = {};
  public chosenItem: any = {};

  constructor(private HomeSvc: HomeService) {
    setTimeout(() => {
      this.changeNumber();
    }, 300);
  }

  changeNumber() {
    this.HomeSvc.setNumber(2000);
  }

  changeUser(newName: any) {
    console.log('newname');
    console.log(newName);
    this.currentUser.username = newName;
  }
  ngOnInit() {
    console.log('home');

    this.HomeSvc.getChosenItem().subscribe((item) => {
      this.chosenItem = item;
    });

    this.HomeSvc.getItemModalState().subscribe((state) => {
      this.modalState = state;
    });

    this.HomeSvc.getCurrentUser().subscribe((user) => {
      console.log(user);
      this.currentUser = user;
    });
    this.HomeSvc.getFavs().subscribe((FavItems) => {
      console.log(FavItems);
      this.FavItems = FavItems;
    });

    this.HomeSvc.getTopComments().subscribe((topComments) => {
      console.log(topComments);
      this.TopComments = topComments;
    });
  }
}
