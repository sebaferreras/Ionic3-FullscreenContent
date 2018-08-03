// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

// Ionic
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// App
import { MyApp } from './app.component';

// Custom directives
import { FullscreenContentComponent } from '../components/full-screen-content/fullscreen-content.component';

// Pages
import { HomePage } from '../pages/home/home';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		FullscreenContentComponent
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			platforms: {
				ios: {
					statusbarPadding: true
				}
			}
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
