import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'fun-button',
    template: `<button class="btn btn-primary" (click)="onClick()">{{displayValue}}</button>`
})

export class FunButtonComponent {
    @Input() displayValue: string;
    @Output() clickEvent = new EventEmitter();

    onClick() {
        this.clickEvent.emit('click');
    };
}
