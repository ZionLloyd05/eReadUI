import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PrimaryNavComponent } from './navbar/primary-nav/primary-nav.component';
import { SecondaryNavComponent } from './navbar/secondary-nav/secondary-nav.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, PrimaryNavComponent, SecondaryNavComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }
