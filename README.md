# Fullscreen Content demo [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

This demo shows how to hide the header when scrolling down and show it again when scrolling up.

<p>
    <img src="resources/gifs/ios.gif" alt="ios" width="350">
    <img src="resources/gifs/android.gif" alt="android" width="350">
</p>

## Ionic View 

Code: **3d962bb7**

You can check this project out by using Ionic View with the code above. 
Please note that there may be some issues related to the status bar on iOS when taking a look at the app using Ionic View.

## Running the demo

Inside of the project folder, run `npm install` and then `ionic serve --lab` to run the demo in the browser.

## Using the component in your projects

Just copy the `full-screen-content` folder (inculding the html, ts and scss files) in your project, and include the `FullscreenContentComponent` in the `declarations` array from your `@NgModule`.

Then in your view, just include the header and the content inside the `<fullscreen-content></fullscreen-content>` tags, and add the `content-type="header"` attribute to the header and the `content-type="body"` attribute to the body.

```
<fullscreen-content>

	<!-- You need to include the content-type="header" attribute to your header -->
	<ion-header content-type="header">
		<!-- ... -->
	</ion-header>

	<!-- You need to include the content-type="body" attribute to your header -->
	<ion-content content-type="body">
        <!-- ... -->
    </ion-content>

</fullscreen-content>
```

## Custom options

You can change the default **tolerance** (scroll tolerance in px before state changes) and **offset** (vertical offset in px before element is first unpinned), the target **headerSelector** and **scrollElementSelector** and the class names used when showing (**headerVisibleClassName**) and hidding (**headerHiddenClassName**) the header.

The config should be an object of the `FullScreenContentConfig` type:

```
// Configuration interface
export class FullScreenContentConfig {
    public tolerance?: number = 1;
    public offset?: number = 250;

    // Elements selectors
    public headerSelector?: string = 'header';
    public scrollElementSelector?: string = 'scroll-content';

    // Css classes
    public headerVisibleClassName?: string = 'header--visible';
    public headerHiddenClassName?: string = 'header--hidden';
}
```

You can override some of the properties:

```
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
```

... and send the config object to the component:

```
<fullscreen-content [config]="config">
    <!-- ... -->
</fullscreen-content>
```

## iOS fix

In order to avoid showing the ios status bar with a transparent background, the following styles are added to the `fullscreen-content.component.scss` file:

```
// Used to avoid showing the statusbar with a transparent background
// ------------------------------------------------------------------
.ios {
    ion-header {
        padding-top: 20px;
    }
    .ios-status-bg {
        position: absolute;
        width: 100%;
        height: 20px;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: map-get($colors, primary);
    } 
}
```
