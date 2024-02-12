import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeService } from './home.service';
import { ChosenitemComponent } from './chosenitem/chosenitem.component';
import { HomeComponent } from './home/home.component';
import { ItemSubmitComponent } from './item-submit/item-submit.component';
import { VelveteenHeaderComponent } from './velveteen-header/velveteen-header.component';
import { Agent } from './star';
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
  canvasRef: any;
  public context: any;

  public backGroundSize:any ={
    height:800,
    width:1000
  };

  onResize(e:any){
    console.log(e.target)
      console.log(e.target.innerWidth);
      this.backGroundSize.height = e.target.innerHeight+300;
      this.backGroundSize.width= e.target.innerWidth


    

  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d');
    console.log(this.canvasRef.nativeElement.height);
    console.log(this.canvasRef.nativeElement.width);

    console.log(this.context);
    if (!this.context) {
      throw new Error('Unable to obtain 2D rendering context');
    }

    this.sketch(
      this.canvasRef.nativeElement.width / 2,
      this.canvasRef.nativeElement.height / 2
    );
    this.startAnimating(60);
  }

  // startAnimation() {
  //   requestAnimationFrame(() => this.animate());
  // }

  settings = {
    dimensions: [300, 150],
    animate: true,
  };
  private i: number = 0;

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

  agents: Agent[] = [];
  fpsInterval: any;
  then: any;
  startTime: any;
  dotsmove: String = 'on';
  waterColor: string = 'black';
  now: any;
  elapsed: any;

  tick = () => {
    if (this.agents.length > 0 && this.dotsmove == 'on') {
      // console.log(waterColor)
      this.context.fillStyle = this.waterColor;
      this.context.fillRect(
        0,
        0,
        this.canvasRef.nativeElement.width,
        this.canvasRef.nativeElement.height
      );
      for (let i = 0; i < this.agents.length; i++) {
        this.agents[i].update();
        this.agents[i].draw(this.context);
        this.agents[i].bounce(
          this.canvasRef.nativeElement.width / 2,

          this.canvasRef.nativeElement.height / 2
        );
      }
    }
    window.requestAnimationFrame(this.tick);

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    // if enough time has elapsed, draw the next frame

    if (this.elapsed > this.fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      this.then = this.now - (this.elapsed % this.fpsInterval);
    }
  };

  startAnimating(fps: any) {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.tick();
  }

  sketch(width: number, height: number) {
    for (let i = 0; i < 40; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      this.agents.push(new Agent(x, y, color));
    }
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

// import { Component, ViewChild, ElementRef } from '@angular/core';

// @Component({
//   selector: 'app-parent',
//   template: `
//     <div>
//       <h1>Hello, my rebellious darling!</h1>
//       <div #childelement="">Behold, a child element!</div>
//     </div>
//   `,
// })
// export class ParentComponent {
//   @ViewChild('childElement', { static: false })
//   childElementRef!: ElementRef;

//   ngAfterViewInit(): void {
//     if (this.childElementRef) {
//       const childElement = this.childElementRef.nativeElement as HTMLElement;
//       // Now you can perform all sorts of wicked manipulations on your child element.
//     }
//   }
// }
// ```
