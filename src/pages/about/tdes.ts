import { Component } from '@angular/core';
import { NavController,NavParams,LoadingController, Loading, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TabsPage } from "../tabs/tabs";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-tdes',
  templateUrl: 'tdes.html'
})
export class TdesPage {

  loading: Loading;
  form = {iddesk: '',kditem: '', desk1: '', desk2: '',desk3: '',desk4: '', base64: ''};
  kddesa;
  constructor(public navCtrl: NavController,public navParams: NavParams, private camera: Camera,public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
    this.kddesa = navParams.get('kddesa');
  }

  kamera(){
      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        // mediaType: this.camera.MediaType.PICTURE
        sourceType: this.camera.PictureSourceType.CAMERA

      }

      this.camera.getPicture(options).then((imageData) => {
        this.form.base64 = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
        // Handle error
      });
  }

  media(){
      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        // mediaType: this.camera.MediaType.PHOTOLIBRARY,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      this.camera.getPicture(options).then((imageData) => {
        this.form.base64 = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
        // Handle error
      });
  }

  simpan(){
    // if(this.form.base64 == ''){
    //   this.setAlert('Error', 'Silahkan pilih foto/kamera');
    // }else{
      this.showLoading();
      let link = 'http://sockieshop.com/webservice/inupdeskripsi';
      let datas = JSON.stringify({ iddesk: this.form.iddesk,kddesa:this.kddesa,kditem:this.form.kditem, desk1: this.form.desk1, desk2: this.form.desk2, desk3: this.form.desk3, desk4: this.form.desk4,base64 : this.form.base64});

      this.http.post(link, datas).map(res => res.json())
        .subscribe(data => {
            if (data.success) {
              this.form = {iddesk: '',kditem:'', desk1: '', desk2: '',desk3: '',desk4: '', base64: ''};
              this.loading.dismiss();
              this.setAlert('Success', data.msg);
                this.navCtrl.setRoot(TabsPage);
            } else {
              this.loading.dismiss();
              this.setAlert('Error', data.msg);
            }
          }, error => {
            this.loading.dismiss();
            this.setAlert('Error', 'Periksa jaringan internet anda');
        });
      // }
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
