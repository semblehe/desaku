import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, Loading, AlertController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {
    artikel: any;
    idartikel: any;
    judul: any;
    time: any;
    loading: Loading;
    ses: any;
    idart:any;

    constructor(public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public app: App) {
        this.ses = window.localStorage.getItem('nama');
        this.idart = navParams.get('idart');
        this.getData(this.idart);
        this.time = new Date().getTime();

    }

    getData(idart) {
        this.showLoading();

        let link = 'http://sockieshop.com/webservice/artikelbyid';
        let datas = JSON.stringify({idart: idart});

        this.http.post(link, datas).map(res => res.json())
            .subscribe(data => {
                this.loading.dismiss();

                if (data.success) {
                    this.artikel = data.dataart.artikel;
                    this.judul = data.dataart.judul;
                    console.log(this.artikel);
                } else {
                    this.artikel = [];
                    this.judul = [];
                    this.setAlert('Error', data.msg);
                }
            }, error => {
                this.loading.dismiss();
                this.setAlert('Error', 'Periksa jaringan internet anda');
            });
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


}