import { NgModule } from '@angular/core';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faChartLine,
  faDatabase,
  faHouseUser,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(private readonly library: FaIconLibrary) {
    library.addIcons(
      faGithub,
      faChartLine,
      faHouseUser,
      faTachometerAlt,
      faDatabase
    );
  }
}
