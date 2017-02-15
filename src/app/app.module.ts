// Angular references
import { NgModule, ErrorHandler } from '@angular/core';

// Ionic references
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

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
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule { }
