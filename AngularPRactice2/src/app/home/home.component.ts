import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { IProduct } from 'src/app/catalog/product.model';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
import { Item } from '../item.model';
import { CommonModule } from '@angular/common';
import { ItemSubmitComponent } from '../item-submit/item-submit.component';


@Component({
  selector: 'bot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  imports:[ItemSubmitComponent, CommonModule]
})
export class HomeComponent {
   public FavItems: any[] = []
   public TopComments:any[]=[]
   public currentUser:any ={} 
  
    changeUser(newName: any) {
    console.log("newname")
    console.log(newName)
    this.currentUser.userName = newName;
  }

  constructor(
    
   
    private HomeSvc: HomeService, 

  ) {
     this.currentUser ={
      userName:"Guest User",
      points:30
      
    }

   }

  ngOnInit() {
    console.log("home")
    this.HomeSvc.getFavs().subscribe((FavItems) => {
      console.log(FavItems);
      this.FavItems = FavItems;
    });

    this.HomeSvc.getTopComments().subscribe((topComments)=>{
      console.log(topComments);
      this.TopComments = topComments
    })
    // this.route.queryParams.subscribe((params) => {
    //   this.filter = params['filter'] ?? '';
    // })
  }

}
