import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-circle',
  templateUrl: './loader-circle.component.html',
  styleUrls: ['./loader-circle.component.scss'],
})
export class LoaderCircleComponent implements OnInit {
  @Input() text: string;
  constructor() {}

  ngOnInit(): void {}
}
