import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading, AlertController,App,Tabs} from 'ionic-angular';
import {Http} from '@angular/http';
import {TdesPage} from "../about/tdes";
import {LoginPage} from "../login/login";
import {AboutPage} from "../about/about";
import 'rxjs/add/operator/map';

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

    constructor(public navCtrl: NavController,public app: App, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
        // this.kddesa = navParams.get('kddesa');
        this.kddesa = '04';
        this.namadesa = navParams.get('namadesa');
        this.ses=window.localStorage.getItem('nama');
        this.getData(this.kddesa);
    }

    show(i, j) {
        this.datas[i].detail[j].show = this.datas[i].detail[j].show == '1' ? '0' : '1';
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

    goBack() {
        const tabsNav = this.app.getNavByIdOrName('myTabsNav') as Tabs;
        tabsNav.select(1);
        this.navCtrl.pop();
        // this.app.getRootNav().setRoot(AboutPage, {}, { animate: true, direction: "back" });
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
