import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent {
  public navbarOpen = false;

  public toggle(): void {
    this.navbarOpen = !this.navbarOpen;
  }
}
