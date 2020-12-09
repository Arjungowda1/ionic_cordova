import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentsPage } from '../../pages/comments/comments';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';



/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish:Dish;
  errMsg:string;
  avgstars:string;
  numComments:number;
  total:number;
  favorite:boolean = false;

  value:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteService:FavoriteProvider,
    private toastCtrl:ToastController,
    private actionCtrl:ActionSheetController,
    private modalCtrl:ModalController,
    private socialSharing:SocialSharing) {

      this.dish = navParams.get('dish');
      this.favorite = this.favoriteService.isFavorite(this.dish.id);
      this.numComments = this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment => total+= comment.rating);
      this.avgstars = (total/this.numComments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites(){
    console.log('Adding', this.dish.name);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: this.dish.name+' added to favorites',
      position: 'middle',
      duration:3000
    }).present();
  }


  presentActionSheet() {
    let actionSheet = this.actionCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () =>{
          this.addToFavorites();
            } 
        },

        {
        text: 'Add Comment',
        handler: () =>{
            let modal = this.modalCtrl.create(CommentsPage);
            modal.onDidDismiss(
              comment => {
                if (comment) {
                  this.dish.comments.push(comment);
                }
              }
            )
            modal.present();
             }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

}
