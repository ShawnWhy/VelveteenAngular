import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ItemSubmitComponent } from './item-submit/item-submit.component';
import { VelveteenHeaderComponent } from './velveteen-header/velveteen-header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ItemSubmitComponent,
    VelveteenHeaderComponent,CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularPractice2';
   public chosenItem:any= {}
   public currentUser :any = {}
}
