import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { JobListComponent } from './jobs/job-list/job-list.component';

@NgModule({
  declarations: [
    AppComponent,
    JobDetailsComponent,
    JobListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
