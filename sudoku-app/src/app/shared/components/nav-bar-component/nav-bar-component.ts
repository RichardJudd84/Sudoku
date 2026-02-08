import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar-component',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.scss',
})
export class NavBarComponent {
  protected faBars = faBars;
  protected menuExpanded = false;

  protected toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
  }
}
