import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
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
    private toastCtrl:ToastController,
    private loadCtrl:LoadingController,
    private alertCtrl:AlertController,
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

    let alert = this.alertCtrl.create({
      title:'Confirm title',
      message:'Do you want to delete Favorite'+ id,
      buttons:[
        {
          text: 'Cancel', 
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete', 
          handler: () => {
            let loading = this.loadCtrl.create({
              content:"Deleting . . ."
            });
        
            let toast = this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully', 
              duration: 3000
            });
        
            loading.present();
            
        
            this.favoriteService.deleteFavorite(id)
            .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present(); } ,
                        errmess =>{ this.err = errmess; loading.dismiss(); });
          }
        }
      ]
    });    
    alert.present();
    item.close();
  }
}
