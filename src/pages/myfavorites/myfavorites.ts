import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
/**
 * Generated class for the MyfavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myfavorites',
  templateUrl: 'myfavorites.html',
})
export class MyfavoritesPage implements OnInit{

  favorites:Dish[];
  err: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteService:FavoriteProvider,
    @Inject('BaseURL') private BaseURL) {
  }
  ngOnInit(): void {
    this.favoriteService.getFavorites()
    .subscribe(favorites => this.favorites = favorites,
      errmess => this.err = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyfavoritesPage');
  }


  deleteFavorite(item: ItemSliding, id: number){
    console.log('delete',id);
    this.favoriteService.deleteFavorite(id)
    .subscribe(favorites => this.favorites = favorites,
      errmess => this.err = errmess);
    item.close();
  }
}
