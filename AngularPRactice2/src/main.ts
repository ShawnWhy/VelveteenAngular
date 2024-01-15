import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { SiteHeaderComponent } from './app/site-header/site-header.component';

bootstrapApplication(AppComponent,appConfig)
  .catch((err) => console.error(err));
