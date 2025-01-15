import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ItHeaderComponent, ItNavBarItemComponent} from 'design-angular-kit';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    ItNavBarItemComponent,
    ItHeaderComponent,
    NgOptimizedImage,
    RouterLink
  ],
})
export class HeaderComponent {
  public MENU_ITEMS: Array<any> = [
    {name: 'Home', path: '/'}
  ]

  constructor(public router: Router) {
  }
}
