import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'bot-community',
  standalone: true,
  imports: [],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent {
  currentUser : any = {}
  filter:string=""
  constructor(private route: ActivatedRoute,
    private homeSV:HomeService) {}
  ngOnInit() {
    this.homeSV.getCurrentUser().subscribe((user)=>{
      console.log(user)
      console.log("comminity page")
      this.currentUser=user;
    })
    // this.filter=this.route.snapshot.params['filter'];
    console.log('oninit communitry');
    this.route.params.subscribe((params) => {
      this.filter = params['filter'] ?? 'no params';
      
      
    });
  }
}
