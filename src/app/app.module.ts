import { NotifyService } from './shared/services/notify.service';
import { AuthModule } from './auths/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './app/navbar/navbar.component';
import { PrimaryNavComponent } from './app/navbar/primary-nav/primary-nav.component';
import { SecondaryNavComponent } from './app/navbar/secondary-nav/secondary-nav.component';
import { FooterComponent } from './app/footer/footer.component';
import { MatMenuModule, MatSnackBarModule } from '@angular/material';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PrimaryNavComponent,
    SecondaryNavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    AuthModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }