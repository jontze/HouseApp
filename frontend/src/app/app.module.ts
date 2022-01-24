import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CreatorModule } from './features/creator/creator.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers, metaReducers } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { OilEffects } from './store/oil/oil.effects';
import { PowerEffects } from './store/power/power.effects';
import { WaterEffects } from './store/water/water.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    LayoutModule,
    CreatorModule,
    DashboardModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([OilEffects, PowerEffects, WaterEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
