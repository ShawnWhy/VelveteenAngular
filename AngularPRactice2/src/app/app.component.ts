import { Component } from '@angular/core';
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
    ChosenitemComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  modalState:string = "off"
  title = 'The Velveteen Exchange';
  FavItems: any[] = [];
  TopComments: any[] = [];
  currentUser: any = {};
  public chosenItem: any = {
   
  };


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
    this.currentUser.userName = newName;
  }
  ngOnInit() {
    console.log('home');

    this.HomeSvc.getChosenItem().subscribe((item)=>{
      this.chosenItem = item;
    })

    this.HomeSvc.getItemModalState().subscribe((state)=>{
      this.modalState=state;
    })

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
