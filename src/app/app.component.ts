// Angular references
import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';

// Ionic references
import { StatusBar, Splashscreen } from 'ionic-native';

// Pages
import { HomePage } from '../pages/home/home';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage = HomePage;

	constructor(platform: Platform, private config: Config) {
		platform.ready().then(() => {
			StatusBar.styleLightContent();
			Splashscreen.hide();
		});
	}
}
