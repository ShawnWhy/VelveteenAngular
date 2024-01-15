import { Component } from '@angular/core';
// import {RouterLink, RouterLinkActive, RouterOutlet} from ''
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-velveteen-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './velveteen-header.component.html',
  styleUrl: './velveteen-header.component.css'
})
export class VelveteenHeaderComponent {

}
