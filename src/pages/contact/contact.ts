import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

    logout():void {
        window.localStorage.removeItem('nama');
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    login():void {
        this.navCtrl.push(LoginPage);
    }

}
