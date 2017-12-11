import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { DetailpetaPage } from '../about/detailpeta';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DetailpetaPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
