// Angular references
import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';

// Ionic references
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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
			splashScreen.hide();
		});
	}
}
