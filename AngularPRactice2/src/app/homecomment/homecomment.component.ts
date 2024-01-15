import { Component } from '@angular/core';
import { ItemSubmitComponent } from '../item-submit/item-submit.component';

@Component({
  selector: 'bot-homecomment',
  standalone: true,
  imports: [ItemSubmitComponent],
  templateUrl: './homecomment.component.html',
  styleUrls: ['./homecomment.component.css']
})
export class HomecommentComponent {

}
