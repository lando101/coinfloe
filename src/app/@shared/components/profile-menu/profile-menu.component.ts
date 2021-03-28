import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { ThemeService } from '@app/services/theme.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  @Input() username: string;
  @Input() title: string;
  @Output() logout = new EventEmitter<boolean>(false);

  public config: PerfectScrollbarConfigInterface = {
    wheelSpeed: 0.25,
    // suppressScrollY: false,
  };
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  logOut() {
    this.logout.emit(true);
  }
}
