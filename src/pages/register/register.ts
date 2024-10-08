import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm:FormGroup;
  image: string ='assets/images/logo.png';


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder:FormBuilder,
    private viewCtrl:ViewController,
    private camera:Camera) {

      this.registerForm = this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
        userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
        telnum:['', [Validators.required, Validators.pattern]],
        email:['', [Validators.required, Validators.email]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  

  dismiss(){
    this.viewCtrl.dismiss(true);
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT
    }

    this.camera.getPicture(options).then((imageData) => {

      this.image = imageData;
      console.log(imageData);
    }, (err) => {
        console.log('Error obtaining picture')
    });
  }

  getFromLibrary() {
  	const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((file_uri) => {
      this.image = file_uri;
      console.log(file_uri);
    }, (err) => {
        console.log('Error obtaining gallery, err')
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.dismiss();
  }

}
