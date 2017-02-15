// Angular references
import { Component } from '@angular/core';

// Fullscreen content model
import { FullScreenContentConfig } from '../../components/full-screen-content/fullscreen-content.component';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	// Config object
	public config: FullScreenContentConfig;

	constructor() {

		// Custom Config
		this.config = {
			tolerance: 10,
			offset : 250
		};
	}
}