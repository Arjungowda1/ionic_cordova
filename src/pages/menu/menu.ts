import { Component,OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoriteProvider } from '../../providers/favorite/favorite';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

  dishes:Dish[];
  dishErrMess:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private dishService: DishProvider,
    @Inject("BaseURL") private BaseURL,
    private favoriteService:FavoriteProvider,
    private toastCtrl:ToastController ) {
  }
  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.dishErrMess = errmess );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  dishSelected(event, dish){
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    });
  }

  addToFavorites(dish: Dish) {
    console.log('Adding', dish.name);
    this.favoriteService.addFavorite(dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + dish.id + ' added as a favorite successfully',
      duration: 3000
    }).present();
  }

}
