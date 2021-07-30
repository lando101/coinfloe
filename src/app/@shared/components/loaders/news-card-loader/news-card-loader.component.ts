import { HttpClient } from '@angular/common/http';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-card-loader',
  templateUrl: './news-card-loader.component.html',
  styleUrls: ['./news-card-loader.component.scss'],
})
export class NewsCardLoaderComponent implements OnInit {
  @Input() theme: string;
  // private root: INode<>
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    // this.getData()
    //   .then((data: any) => {
    //     console.log('GOT THIS FROM PROMISE');
    //     console.log(data);
    //     console.log('GOT THIS FROM PROMISE');
    //   })
  }

  // getData() {
  //   let promise = new Promise((resolve, reject) => {
  //     // reject(new Date());
  //       this.http
  //         .get('')
  //         .toPromise()
  //         .then((res: any) => {
  //           resolve(res);
  //         })
  //         .catch(() => {
  //           reject('error');
  //         });
  //   });

  //   return promise;
  // }
}
