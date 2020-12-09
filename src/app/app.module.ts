import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/menu/menu';
import { ContactPage } from '../pages/contact/contact';
import { DishdetailPage } from '../pages/dishdetail/dishdetail';
import { MyfavoritesPage } from '../pages/myfavorites/myfavorites';
import { ReservationPage } from '../pages/reservation/reservation';
import { CommentsPage } from '../pages/comments/comments';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DishProvider } from '../providers/dish/dish';
import { LeaderProvider } from '../providers/leader/leader';
import { PromotionProvider } from '../providers/promotion/promotion';
import { ProcessHttpMsgProvider } from '../providers/process-http-msg/process-http-msg';
import { baseURL } from '../shared/baseUrl';
import { FavoriteProvider } from '../providers/favorite/favorite';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage,
    MyfavoritesPage,
    ReservationPage,
    CommentsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage,
    MyfavoritesPage,
    ReservationPage,
    CommentsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    LocalNotifications,
    EmailComposer,
    SocialSharing,
    ProcessHttpMsgProvider,
    {provide:'BaseURL', useValue:baseURL},
    FavoriteProvider
  ]
})
export class AppModule {}
