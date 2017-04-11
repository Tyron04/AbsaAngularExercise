import { Component } from '@angular/core';
import { FunButtonComponent } from './fun-button.component';

@Component({
    selector: "fun-parent",
    template: `<h2>Let's have some fun</h2>
    <fun-button [displayValue]="buttonValue" (clickEvent)="clicked()"></fun-button>
    `,
    styles:[``]
})
export class FunParentComponent {
    buttonValue: String;
    constructor() {
        this.buttonValue = "Click me now!";
    }
    clicked() {
        alert("Disappointed aren't you?");
    };

}