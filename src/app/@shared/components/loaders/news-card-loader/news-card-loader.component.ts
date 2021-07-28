import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-card-loader',
  templateUrl: './news-card-loader.component.html',
  styleUrls: ['./news-card-loader.component.scss'],
})
export class NewsCardLoaderComponent implements OnInit {
  @Input() theme: string;
  constructor() {}

  ngOnInit(): void {}
}
