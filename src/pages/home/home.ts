// Angular
import { Component } from '@angular/core';

// Fullscreen content settings
import { FullScreenContentSettings } from '../../components/full-screen-content/models/full-screen-content-settings';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public customSettings: FullScreenContentSettings = {
		tolerance: 10,
		offset: 250
	};

	constructor() { }
}