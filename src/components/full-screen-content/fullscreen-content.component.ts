// Angular references
import { Component, ElementRef, Input, Renderer, ContentChild } from '@angular/core';

// Ionic references
import { Content, Platform } from 'ionic-angular'

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

// DirectionEnum
enum DirectionEnum {
    Up,
    Down
}

@Component({
    selector: 'fullscreen-content',
    templateUrl: 'fullscreen-content.component.html'
})
export class FullscreenContentComponent {

    // Content reference
    @ContentChild(Content) content: Content;

    // Component configuration
    @Input() config: FullScreenContentConfig;

    // Main HTML elements
    private headerElement: any;
    private scrollElement: any;

    private lastPositionY: number;

    constructor(private elementRef: ElementRef,
        private renderer: Renderer,
        private platform: Platform) { }

    ngOnInit() {

        // Initialize the component configuration
        this.extendDefaultConfig();

        // Set the fullscreen attribute to true in order to show the content
        // in the space where the header was when hidding it
        this.content.fullscreen = true;

        // Subscribe to the scroll event of the ion-content element
        this.content.ionScroll.subscribe((evt) => { this.onContentScroll(evt); });

        // Get the header of the page
        this.headerElement = document.getElementsByClassName(this.config.headerSelector)[0];

        // Get the content element
        this.scrollElement = this.elementRef.nativeElement.getElementsByClassName(this.config.scrollElementSelector)[0];

        // Initialize the starting position
        this.lastPositionY = 0;
    }

    ngOnDestroy() {
        this.content.ionScroll.unsubscribe();
    }

    onContentScroll(ev) {
        ev.domWrite(() => {
            this.updateHeaderState(ev);
        });
    }

    // Extend the default config with the custom values sent
    private extendDefaultConfig(): void {
        let defaultConfig = new FullScreenContentConfig();
        for (var key in this.config) {
            defaultConfig[key] = this.config[key];
        }
        this.config = defaultConfig;
    }

    // Check if the tolerance has been exceeded
    private toleranceExceeded(currentPositionY: number): boolean {
        return Math.abs(currentPositionY - this.lastPositionY) >= this.config.tolerance;
    }

    // Get the physical height of the scroll element
    private getScrollerPhysicalHeight(): number {
        return Math.max(
            this.scrollElement.offsetHeight,
            this.scrollElement.clientHeight);
    }

    // Get the height of the scroll element
    private getScrollerHeight(): number {
        return Math.max(
            this.scrollElement.scrollHeight,
            this.scrollElement.offsetHeight,
            this.scrollElement.clientHeight);
    }

    // Show the header
    private showHeader(): void {
        let classList = this.headerElement.classList;
        if (!classList.contains(this.config.headerVisibleClassName)) {
            classList.remove(this.config.headerHiddenClassName);
            classList.add(this.config.headerVisibleClassName);
        }
    }

    // Hide the header
    private hideHeader(): void {
        let classList = this.headerElement.classList;
        if (classList.contains(this.config.headerVisibleClassName) || !classList.contains(this.config.headerHiddenClassName)) {
            classList.add(this.config.headerHiddenClassName);
            classList.remove(this.config.headerVisibleClassName);
        }
    }

    // Returns true if the current scroll position is out of document boundaries
    private isOutOfBounds(currentPositionY: number): boolean {
        return currentPositionY < 0
            || currentPositionY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
    }

    // Shor or hide the header according to the scrolling status
    private updateHeaderState(ev: any) {
        let currentPositionY = ev.scrollTop,
            toleranceExceeded = this.toleranceExceeded(currentPositionY),
            insideOffset = currentPositionY <= this.config.offset,
            scrollDirection = currentPositionY > this.lastPositionY ? DirectionEnum.Down : DirectionEnum.Up;

        if (this.isOutOfBounds(currentPositionY)) {
            return;
        }

        if (scrollDirection === DirectionEnum.Down && !insideOffset && toleranceExceeded) {
            this.hideHeader();
        } else if (scrollDirection === DirectionEnum.Up && (insideOffset || toleranceExceeded)) {
            this.showHeader();
        }

        // Update the last position
        this.lastPositionY = currentPositionY;
    }
}
