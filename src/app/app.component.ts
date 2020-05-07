import { Component, OnInit } from '@angular/core';
import { Job } from './jobs/job';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'resume-website';

  // TODO: Remove after test
  private jobsUrl = '/api/jobs';
  data = [];

  constructor(private http: HttpClient) { }
  ngOnInit(){
    this.getJobs();
  }
  // get("/api/jobs")

  // Modified for Angular 9 using https://www.positronx.io/angular-promises-example-manage-http-requests/
  getJobs(){
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.jobsUrl;
      this.http
        .get<Job[]>(apiURL)
        .toPromise()
        .then((res: any) => {
          // Success
          this.data = res.map((response: any) => {
            return response.json() as Job;
          });
          resolve();
        },
        err => {
          // Error
          reject(err);
        }
      );
    });
    return promise;
  }
}
