import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@app/services/theme.service';
import { Router } from '@angular/router';
interface Links {
  name: string;
  route: string;
  icon_class: string;
  active_icon_class: string;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  theme: string = '';
  show = true;
  activeLink: Links = null;
  links: Links[] = [
    {
      name: 'home',
      route: '/home',
      icon_class: 'bi bi-house',
      active_icon_class: 'bi bi-house-fill',
    },
    {
      name: 'charts',
      route: '/charts',
      icon_class: 'bi bi-bar-chart-line',
      active_icon_class: 'bi bi-bar-chart-line-fill',
    },
    {
      name: 'news',
      route: '/news',
      icon_class: 'bi bi-newspaper',
      active_icon_class: 'bi bi-newspaper',
    },
    {
      name: 'videos',
      route: '/videos',
      icon_class: 'bi bi-play-btn',
      active_icon_class: 'bi bi-play-btn-fill',
    },
  ];
  constructor(private themeService: ThemeService, public router: Router) {
    this.themeService.themeTypeBS.subscribe((data) => {
      if (data) {
        this.theme = data;
      }
    });
  }

  shrinkNav() {
    this.show = !this.show;
  }
  ngOnInit(): void {
    this.activeLink = this.links[0];
  }
}
