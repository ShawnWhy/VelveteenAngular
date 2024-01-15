import { Component } from '@angular/core';


@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
})
export class SiteHeaderComponent  {
  // user: IUser | null = null;
  showSignOutMenu: boolean = false;

  // constructor(private userService: UserService) { }


  //   this.userService.getUser().subscribe({
  //     next: (user) => { this.user = user }
  //   })


  // toggleSignOutMenu() {
  //   this.showSignOutMenu = !this.showSignOutMenu;
  // }

  // signOut() {
  //   this.userService.signOut();
  //   this.showSignOutMenu = false;
  // }
}
