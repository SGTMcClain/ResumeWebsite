import { Injectable } from '@angular/core';
import { Job } from './job';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { resolve } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsUrl = '/api/jobs';
  data = [];

  constructor(private http: HttpClient) { }

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

  // getJobs(): Promise<void | Job[]> {
  //   return this.http
  //     .get(this.jobsUrl)
  //     .toPromise()
  //     .then((response: any) => {
  //       // Success
  //       response.json() as Job[]
  //     });

  // }

  /**
   * post("/api/contacts")
   */

  // createJob() {
  //   const promise = new Promise((resolve, reject) => {
  //     const apiURL = this.jobsUrl;
  //     this.http
  //       .post(this.jobsUrl)
  //   });
  // }

  // createJob(newJob: Job): Promise<void | Job>{
  //   return this.http.post(this.jobsUrl, newJob)
  //     .toPromise()
  //     .then(response => response.json() as Job)
  //     .catch(this.handleError);
  // }
}
