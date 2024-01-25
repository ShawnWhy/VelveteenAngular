import { NgClass, NgIf } from '@angular/common';
import {Component, Input, Output, EventEmitter } from '@angular/core';
// import {RouterLink, RouterLinkActive, RouterOutlet} from ''
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeService } from '../home.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-velveteen-header',
  standalone: true,
  imports: [FormsModule,NgClass, NgIf, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './velveteen-header.component.html',
  styleUrl: './velveteen-header.component.css',
})
export class VelveteenHeaderComponent {
  @Input() currentUser: any = {};
  public buttonState: boolean[] = [false, false, false, false, false, false];
  loginModule: string = 'off';
  signupModule: string = 'off';

  constructor(private homeSvc: HomeService) {}

  public formSignUpUser: any = {
    email: 'jkjk',
    password: '',
    username: '',
    points: 20,
  };

  public formLoginUser: any = {
    email: '',
    password: '',
    username: '',
   };

  ngOnInit() {
    for (let i = 0; i < this.buttonState.length; i++) {
      setTimeout(() => {
        this.buttonState[i] = true;
      }, i * 100);
    }
  }

  signUp(event:any) {
    event.preventDefault();
    console.log(this.formSignUpUser)
    this.homeSvc.signUp({
      email: this.formSignUpUser.email,
      password: this.formSignUpUser.password,
      username: this.formSignUpUser.username,
      points: this.formSignUpUser.points,
    });
  }
  login(event:any){
    event.preventDefault();
    console.log(this.formLoginUser)
    this.homeSvc.login({
      username:this.formLoginUser.username,
      password:this.formLoginUser.password

    })
  }

  signOut(event:any){
    console.log("signing out")
    this.homeSvc.signOut()
  }

  signupModuleOn(e: any) {
    e.preventDefault();
    this.loginModule = 'off';

    this.signupModule = 'on';
  }

  loginModuleOn(e: any) {
    e.preventDefault();
    this.signupModule = 'off';
    this.loginModule = 'on';
  }
}
