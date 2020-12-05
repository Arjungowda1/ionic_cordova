import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController, ViewController } from 'ionic-angular';
import { Validators,FormBuilder, FormGroup } from '@angular/forms';
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  addComment: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder) {

      this.addComment = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 5,
        comment: ['', Validators.required],
        date:''
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  onSubmit() {
    console.log(this.addComment.value);
    this.viewCtrl.dismiss({
      'author': this.addComment.value.author,
      'date': new Date().toISOString(),
      'comment': this.addComment.value.comment,
      'rating': this.addComment.value.rating

    });
  }
}
