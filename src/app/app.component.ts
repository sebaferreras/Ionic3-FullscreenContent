// Angular
import { Component } from '@angular/core';

// Ionic
import { Platform } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { HomePage } from '../pages/home/home';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage = HomePage;

	constructor(platform: Platform,
				statusBar: StatusBar,
				splashScreen: SplashScreen) {
		platform.ready().then(() => {
			statusBar.styleLightContent();

			if (platform.is('ios')) {
				statusBar.overlaysWebView(false);
				statusBar.backgroundColorByHexString('#387ef5');
			}

			splashScreen.hide();
		});
	}
}
