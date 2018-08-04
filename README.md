# Fullscreen Content demo [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

Ionic 3 demo of how to hide the header when scrolling down and show it again when scrolling up.

<p>
    <img src="resources/gifs/ios.gif" alt="ios" width="350">
    <img src="resources/gifs/android.gif" alt="android" width="350">
</p>

# Table of contents

* [Ionic info](#ionic-info)
* [Running the demo](#running-the-demo)
* [Using the component in your projects](#using-the-component-in-your-projects)
* [Settings](#settings)
* [Changelog](#changelog)
* [Contribution](#contribution)
* [Support this project](#support-this-project)

# Ionic info

```
Ionic:

   ionic (Ionic CLI)  : 4.0.1 (/usr/local/lib/node_modules/ionic)
   Ionic Framework    : ionic-angular 3.9.2
   @ionic/app-scripts : 3.1.11

Cordova:

   cordova (Cordova CLI) : 7.1.0
   Cordova Platforms     : android 6.3.0, ios 4.5.4

System:

   Android SDK Tools : 26.1.1
   ios-deploy        : 1.9.2
   ios-sim           : 5.1.0
   NodeJS            : v8.11.1 (/usr/local/bin/node)
   npm               : 5.10.0
   OS                : macOS High Sierra
   Xcode             : Xcode 9.4.1 Build version 9F2000
```

## Running the demo

Inside of the project folder, run `npm install` and then to run the demo in the browser `ionic serve [-t android/ios]`

## Using the component in your projects

Just copy the `full-screen-content` folder (inculding the html, ts and scss files) in your project. Then include the `FullscreenContentComponent` in the `declarations` array from your `@NgModule`.

Then in your view, just include the header and the content inside the `<fullscreen-content></fullscreen-content>` tags and add the `#target` template variable to the header

```
<fullscreen-content>

    <ion-header #target>
        ...
    </ion-header>

    <ion-content>
        ...
    </ion-content>

</fullscreen-content>
```

**Important**

When using the component on iOS, please make sure to:

1) Install the [Web View plugin for Cordova that is specialized for Ionic apps](https://github.com/ionic-team/cordova-plugin-ionic-webview#installation-instructions).
2) Configure the `StatusBar` cordova plugin setting the `overlaysWebView` to be `false`, and the `backgroundColorByHexString` to be the same color of your header. For example if your header's color is `#387ef5` (Ionic's default primary color):

```
// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';

// Pages
import { HomePage } from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    // ...

    constructor(platform: Platform, statusBar: StatusBar) {

        platform.ready().then(() => {

            statusBar.styleLightContent();

            if (platform.is('ios')) {
                statusBar.overlaysWebView(false);                // <--- Here!
                statusBar.backgroundColorByHexString('#387ef5'); // <--- And here!
            }

            // ...
        });
    }
}
```

## Settings

The component also defines the `FullScreenContentSettings` interface, to customize the behaviour of the component.

```
export interface FullScreenContentSettings {
    tolerance?: number;
    offset?: number;
    headerVisibleClassName?: string;
    headerHiddenClassName?: string;
}
```

The settings should be sent to the component using the `settings` property:

```
// Fullscreen content settings
import { FullScreenContentSettings } from '../path/to/component/models/full-screen-content-settings';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public customSettings: FullScreenContentSettings = {
        tolerance: 10,
        offset: 250
    };

    // ...
}
```

And in the view:

```
<fullscreen-content [settings]="customSettings">
    ...
</fullscreen-content>
```

You can change the default **tolerance** () and **offset** () and the class names used when showing (**headerVisibleClassName**) and hidding (**headerHiddenClassName**) the header.

Param | Type | Description | Default value
--- | --- | ---| ---
`tolerance` | `number` | **Optional**. Scroll tolerance in `px` before state changes | `10`
`offset` | `number` | **Optional**. Vertical offset in `px` before element is first unpinned | `250`
`headerVisibleClassName` | `string` | **Optional**. Name of the class used to show the header | `header--visible`
`headerHiddenClassName` | `string` | **Optional**. Name of the class used to hide the header | `header--hidden`

# Changelog

 * **04/08/2018** Updated dependencies to use the latest Ionic 3 version. Improved internal logic to avoid accessing the DOM directly

 # Contribution
- Having an **issue** or looking for **support**? [Open an issue](https://github.com/sebaferreras/Ionic3-FullscreenContent/issues/new) and I'll do my best to help you out.
- Got a **new feature or a bug fix**? Fork the repo, make your changes, and submit a pull request.

# Support this project
If you find this project useful, please star the repo to let people know that it's reliable. Also, share it with friends and colleagues that might find this useful as well. Thank you! :)