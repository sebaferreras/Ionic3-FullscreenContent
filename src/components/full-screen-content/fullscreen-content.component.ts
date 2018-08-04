// Angular
import { Component, ElementRef, Input, ContentChild, Renderer2 } from '@angular/core';

// Ionic
import { Content } from 'ionic-angular'

// Models
import { FullScreenContentSettings } from './models/full-screen-content-settings';

// Enums
enum Direction { Up, Down };

@Component({
    selector: 'fullscreen-content',
    templateUrl: 'fullscreen-content.component.html'
})
export class FullscreenContentComponent {

    @ContentChild(Content) content: Content;
    @ContentChild('target') target: ElementRef;

    private scrollElement: any;
    private lastPositionY: number;
    private targetIsVisible: boolean = true;
    private componentSettings: FullScreenContentSettings;

    @Input('settings')
    set settings(value: FullScreenContentSettings) {
        if (value) {
            this.componentSettings = value;
            this.mergeSettings();
        }
    }

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit() {

        if (!this.target) {
            this.printErrorInConsole(`Missing #target template variable in the HTML element that should be hidden when scrolling.`);
            return;
        }

        if (!this.content) {
            this.printErrorInConsole(`Missing ion-content element.`);
            return;
        }

        // Set the fullscreen attribute to true in order to show the content
        // in the space where the header was when hidding it
        this.content.fullscreen = true;

        // Subscribe to the scroll event of the ion-content element
        this.content.ionScroll.subscribe((evt) => {
            this.onContentScroll(evt);
        });

        // Get the content element. This is a hidden method from Ionic 
        // but it's still better than accessing the DOM directly
        this.scrollElement = this.content.getScrollElement()

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

    // Check if the tolerance has been exceeded
    private toleranceExceeded(currentPositionY: number): boolean {
        return Math.abs(currentPositionY - this.lastPositionY) >= this.componentSettings.tolerance;
    }

    // Get the physical height of the scroll element
    private getScrollerPhysicalHeight(): number {
        return Math.max(this.scrollElement.offsetHeight, this.scrollElement.clientHeight);
    }

    // Get the height of the scroll element
    private getScrollerHeight(): number {
        return Math.max(this.scrollElement.scrollHeight, this.scrollElement.offsetHeight, this.scrollElement.clientHeight);
    }

    // Show the header
    private showHeader(): void {
        if (this.targetIsVisible) return;

        this.targetIsVisible = true;
        this.renderer.removeClass(this.target.nativeElement, this.componentSettings.headerHiddenClassName);
        this.renderer.addClass(this.target.nativeElement, this.componentSettings.headerVisibleClassName);
    }

    // Hide the header
    private hideHeader(): void {
        if (!this.targetIsVisible) return;

        this.targetIsVisible = false;
        this.renderer.removeClass(this.target.nativeElement, this.componentSettings.headerVisibleClassName);
        this.renderer.addClass(this.target.nativeElement, this.componentSettings.headerHiddenClassName);
    }

    // Returns true if the current scroll position is out of document boundaries
    private isOutOfBounds(currentPositionY: number): boolean {
        return currentPositionY < 0 || currentPositionY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
    }

    // Shor or hide the header according to the scrolling status
    private updateHeaderState(ev: any) {
        const currentPositionY = ev.scrollTop,
            toleranceExceeded = this.toleranceExceeded(currentPositionY),
            insideOffset = currentPositionY <= this.componentSettings.offset,
            scrollDirection = currentPositionY > this.lastPositionY ? Direction.Down : Direction.Up;

        if (this.isOutOfBounds(currentPositionY)) {
            return;
        }

        if (scrollDirection === Direction.Down && !insideOffset && toleranceExceeded) {
            this.hideHeader();
        } else if (scrollDirection === Direction.Up && (insideOffset || toleranceExceeded)) {
            this.showHeader();
        }

        // Update the last position
        this.lastPositionY = currentPositionY;
    }

    // Merge the settings received with the default settings
    private mergeSettings(): void {
        const defaultSettings: FullScreenContentSettings = {
            tolerance: 10,
            offset: 250,
            headerVisibleClassName: 'header--visible',
            headerHiddenClassName: 'header--hidden'
        };

        if (!this.componentSettings) {
            // Use the default values
            this.componentSettings = defaultSettings;
            return;
        }

        this.componentSettings.tolerance = this.isDefinedAndPositive(this.componentSettings.tolerance) ? this.componentSettings.tolerance : defaultSettings.tolerance;
        this.componentSettings.offset = this.isDefinedAndPositive(this.componentSettings.offset) ? this.componentSettings.offset : defaultSettings.offset;
        this.componentSettings.headerHiddenClassName = this.isDefined(this.componentSettings.headerHiddenClassName) ? this.componentSettings.headerHiddenClassName : defaultSettings.headerHiddenClassName;
        this.componentSettings.headerVisibleClassName = this.isDefined(this.componentSettings.headerVisibleClassName) ? this.componentSettings.headerVisibleClassName : defaultSettings.headerVisibleClassName;
    }

    private isDefined(property: any): boolean {
        return property !== null && property !== undefined;
    }

    private isDefinedAndPositive(property: any): boolean {
        return this.isDefined(property) && !isNaN(property) && property > 0;
    }

    private printErrorInConsole(errorMessage: string): void {
        console.error(`[FullScreenContent]: ${errorMessage}`);
    }
}
