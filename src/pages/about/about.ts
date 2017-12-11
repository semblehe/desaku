import {Component} from '@angular/core';
import {NavController, LoadingController, Loading, AlertController} from 'ionic-angular';
import {DetailpetaPage} from '../about/detailpeta';
import {LoginPage} from "../login/login";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {
    GoogleMap,
    GoogleMaps,
    GoogleMapsEvent,
    GoogleMapOptions,
    // HtmlInfoWindow
    // CameraPosition,
    // MarkerOptions,
    // Marker
} from '@ionic-native/google-maps';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    maps: GoogleMap;
    loading: Loading;
    data: any;
    ses: any;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
        this.ses = window.localStorage.getItem('nama');
        this.getItems();
    }

// ionViewDidLoad() {
//  this.loadMap();
// }

    getItems() {
        this.showLoading();

        let link = 'http://sockieshop.com/webservice/peta';
        let datas = JSON.stringify({term: ''});

        this.http.post(link, datas).map(res => res.json())
        // this.http.get(link).map(res => res.json())
            .subscribe(data => {
                if (data.success) {
                    this.loading.dismiss();
                    this.data = data.data;
                    this.loadMap();
                } else {
                    this.loading.dismiss();
                    this.setAlert('Error', data.msg);
                }
            }, error => {
                this.loading.dismiss();
                this.setAlert('Error', 'Periksa jaringan internet anda');
            });
    }

    loadMap() {

        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: -8.2169246,
                    lng: 114.3486412
                },
                zoom: 11,
                tilt: 30
            }
        };

// this.map =  new GoogleMap('map', mapOptions);
        this.maps = GoogleMaps.create('map', mapOptions);

// Wait the MAP_READY before using any methods.
        this.maps.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                console.log('Map is ready!');
                this.loading.dismiss();


                for (let p = 0; p < this.data.length; p++) {
                    let points = [];
                    let purut = this.data[p].pnourut.split(',');
                    let plat = this.data[p].platitude.split(',');
                    let plong = this.data[p].plongitude.split(',');

                    let m = [];
                    this.maps.addMarker({
                        title: this.data[p].namadesa,
                        snippet: 'klik untuk detail',
                        flat: true,
                        icon: this.data[p].warna,
                        infoWindowAnchor: [10, 70],
                        position: {
                            lat: this.data[p].latitude,
                            lng: this.data[p].longitude
                        }
                    }).then(marker => {
                        m[p] = marker;
                        marker.on(GoogleMapsEvent.INFO_CLICK)
                            .subscribe((e) => {
                                this.navCtrl.push(DetailpetaPage, {
                                    kddesa: this.data[p].kddesa,
                                    namadesa: this.data[p].namadesa
                                });
                            });
                    });

                    for (let pu = 0; pu < purut.length; pu++) {
                        points[pu] = [];
                        points[pu]['lat'] = plat[pu];
                        points[pu]['lng'] = plong[pu];
                    }

                    this.maps.addPolygon({
                        clickable: true,
                        points: points,
                        strokeColor: this.data[p].warna,
                        fillColor: this.data[p].warna,
                    }).then(polygon => {
                        polygon.on(GoogleMapsEvent.POLYGON_CLICK)
                            .subscribe((e) => {
                                m[p].showInfoWindow();
                            });
                    });

                    // infow[p].open(m[p]);

                }


            });
    }

    login(): void {
        this.navCtrl.push(LoginPage);
    }

    logout(): void {
        window.localStorage.removeItem('nama');
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
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
