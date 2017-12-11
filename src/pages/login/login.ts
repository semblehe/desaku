import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from "../tabs/tabs";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  form = { username: '', password: ''};


  constructor( public navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public http: Http) {

  }

  public login() {
    if (this.form.username.replace(/ /g, '') == '' || this.form.password.replace(/ /g, '') == '') {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Username dan Password harus diisi!',
        buttons: ['TUTUP']
      });
      alert.present(prompt);
    } else {
      this.showLoading();

      let link = 'http://sockieshop.com/webservice/login';
      let datas = JSON.stringify({ username: this.form.username, password: this.form.password });

      this.http.post(link, datas).map(res => res.json())
        .subscribe(data => {
          console.log(data);
          this.loading.dismiss();

          if (data.success) {
              window.localStorage.setItem('nama', this.form.username);
              let alert = this.alertCtrl.create({
                  title: 'Berhasil',
                  subTitle: data.msg,
                  buttons: ['TUTUP']
              });
              alert.present(prompt);
              this.navCtrl.setRoot(TabsPage);
          } else {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: data.msg,
              buttons: ['TUTUP']
            });
            alert.present(prompt);
          }
        }, error => {
          console.log(error);
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Periksa Jaringan Internet Anda',
            buttons: ['TUTUP']
          });
          alert.present(prompt);
        });
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Mohon tunggu...'
    });
    this.loading.present();
  }

    alerts(t, a) {
        let alert = this.alertCtrl.create({
            title: t,
            subTitle: a,
            buttons: ['TUTUP']
        });
        alert.present(prompt);
    }
}
