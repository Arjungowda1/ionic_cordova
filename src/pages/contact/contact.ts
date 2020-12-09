import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private emailComposer:EmailComposer,
  	private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendEmail(){
    let email = {
      to: "confusion@food.net",
      subject: "[Confusion] query",
      body: "Dear sir,",
      isHtml: true
    };

    this.emailComposer.open(email);
  }

  callRestaurant(number) {
  	this.callNumber.callNumber(number, true)
  	.then(res => console.log('Launched dialer!', res))
  	.catch(err => console.log('Error launching dialer', err));
  }
  
}
