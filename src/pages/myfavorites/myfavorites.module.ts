import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyfavoritesPage } from './myfavorites';

@NgModule({
  declarations: [
    MyfavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyfavoritesPage),
  ],
})
export class MyfavoritesPageModule {}
