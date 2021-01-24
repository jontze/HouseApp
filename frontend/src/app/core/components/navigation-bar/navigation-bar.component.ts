import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  public navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  public toggle(): void {
    this.navbarOpen = !this.navbarOpen;
  }
}
