import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading, AlertController,App,ModalController} from 'ionic-angular';
import {Http} from '@angular/http';
import {TdesPage} from "../about/tdes";
import {LoginPage} from "../login/login";
import {ModalPage} from "../about/modal";
import 'rxjs/add/operator/map';
import {TabsPage} from "../tabs/tabs";

@Component({
    selector: 'page-detailpeta',
    templateUrl: 'detailpeta.html'
})
export class DetailpetaPage {

    kddesa;
    namadesa;
    datas: any;
    ses: any;
    loading: Loading;
    time:any;

    constructor(public modalCtrl: ModalController,public navCtrl: NavController,public app: App, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
        this.kddesa = navParams.get('kddesa');
        // this.kddesa = '02';
        this.namadesa = navParams.get('namadesa');
        this.ses=window.localStorage.getItem('nama');
        this.getData(this.kddesa);
        this.time = new Date().getTime();
    }

    show(i, j) {
        this.datas[i].detail[j].show = this.datas[i].detail[j].show == '1' ? '0' : '1';
    }

    showFoto(a) {
        console.log(a);
        let modalfoto = this.modalCtrl.create(ModalPage, { image: a});
        modalfoto.present();
    }

    getData(kddesa) {
        this.showLoading();

        let link = 'http://sockieshop.com/webservice/deskripsi';
        let datas = JSON.stringify({kddesa: kddesa});

        this.http.post(link, datas).map(res => res.json())
            .subscribe(data => {
                this.loading.dismiss();

                if (data.success) {
                    this.datas = data.deskripsi;
                } else {
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

    tambah(): void {
        this.navCtrl.push(TdesPage, {kddesa: this.kddesa});
    }

    login(): void {
        this.navCtrl.push(LoginPage);
    }

    logout(): void {
        window.localStorage.removeItem('nama');
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    del(a):void {
        let confirm = this.alertCtrl.create({
            title: 'Peringatan !! ',
            message: 'Apa Anda Yakin Hapus Deskripsi?',
            buttons: [
                {
                    text: 'Tidak',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Ya',
                    handler: () => {
                        this.showLoading();
                        let link = 'http://sockieshop.com/webservice/deldesk';
                        let datas = JSON.stringify({iddes: a});

                        this.http.post(link, datas).map(res => res.json())
                            .subscribe(data => {
                                this.loading.dismiss();
                                this.setAlert('Success', 'Berhasil Hapus Data');
                                this.navCtrl.setRoot(TabsPage);
                            }, error => {
                                this.loading.dismiss();
                                this.setAlert('Error', 'Periksa jaringan internet anda');
                            });
                    }
                }
            ]
        });
        confirm.present();
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
