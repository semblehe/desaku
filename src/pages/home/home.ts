import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController, App } from 'ionic-angular';
import { TartikelPage } from "../home/tartikel";
import { LoginPage } from "../login/login";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  artikel: any;
  time: any;
  loading: Loading;
  ses:any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public app: App) {
   this.getArtikel();
   this.ses=window.localStorage.getItem('nama');

   console.log(this.ses);
       this.time = new Date().getTime();

  }

  getArtikel() {
  		this.showLoading();

      let link = 'http://sockieshop.com/webservice/artikel';

      this.http.get(link).map(res => res.json())
  			.subscribe(data => {
  				this.loading.dismiss();

  				if (data.success) {
  					this.artikel = data.artikel;
  				} else {
  					this.artikel = [];
  					this.setAlert('Error', data.msg);
  				}
  			}, error => {
  				this.loading.dismiss();
  				this.setAlert('Error', 'Periksa jaringan internet anda');
  			});
  	}

    tambah():void {
    this.navCtrl.push(TartikelPage);
    }

    login():void {
    this.navCtrl.push(LoginPage);
    }


  showLoading() {
  		this.loading = this.loadingCtrl.create({
  			content: 'Mohon tunggu...'
  		});
  		this.loading.present();
  	}

  	setAlert(t, m) {
  		let alert = this.alertCtrl.create({
  			title: t,
  			subTitle: m,
  			buttons: ['TUTUP']
  		});
  		alert.present(prompt);
  	}

    logout():void {
        window.localStorage.removeItem('nama');
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
}
