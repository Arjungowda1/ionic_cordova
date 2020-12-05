import { Component,OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit{

  leader:Leader[];
  errMsg:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public leaderService:LeaderProvider,
    @Inject("BaseURL") private BaseURL) {
  }
  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(leader => this.leader = leader,
      errmess => this.errMsg = errmess)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
