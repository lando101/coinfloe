import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@app/services/theme.service';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
interface Links {
  name: string;
  route: string;
  icon_class: string;
  active_icon_class: string;
  type: string;
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
      name: 'explore',
      route: '/home',
      icon_class: 'bi bi-binoculars',
      active_icon_class: 'bi bi-binoculars-fill',
      type: 'bs',
    },
    {
      name: 'coins',
      route: '/coins',
      icon_class: 'bi bi-coin',
      active_icon_class: 'bi bi-bar-chart-line-fill',
      type: 'fa',
    },
    {
      name: 'news',
      route: '/news',
      icon_class: 'bi bi-newspaper',
      active_icon_class: 'bi bi-newspaper',
      type: 'bs',
    },
    {
      name: 'videos',
      route: '/videos',
      icon_class: 'bi bi-play-btn',
      active_icon_class: 'bi bi-play-btn-fill',
      type: 'bs',
    },
  ];
  constructor(private themeService: ThemeService, public router: Router, private library: FaIconLibrary) {
    library.addIcons(faCoins);
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
