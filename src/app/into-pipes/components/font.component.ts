import { Component, EventEmitter } from '@angular/core';
import { PipeComponent } from '../interfaces/pipe.component';

@Component({
    selector: 'font-component',
    template: `
        <span *ngIf="location === 'left'"    [class]="font" aria-hidden='true'></span>
        <span *ngIf="location !== 'replace'" [textContent]="content"></span>
        <span *ngIf="location === 'right'"   [class]="font" aria-hidden='true'></span>
        <span *ngIf="location === 'replace'" [class]="font" aria-hidden='true'></span>
    `,
    styles: [
        `span span {
            float: left;
        }
        `
    ]
})
export class FontComponent implements PipeComponent {
    font: string;
    location: string;
    source: string;
	id: string;
	name: string;
    content: string;
	onIntoComponentChange: EventEmitter<any>;

    transform(source: any, args: any[]) {
        this.source = source;
        this.font = args[0];
        this.location = args.length > 1 ? args[1] : "left";
        const action = args.length > 2 ? args[2].toLowerCase() : "";
        this.content = action === "*" ? source : ("replace" === action.toLowerCase() ? "" : source);
    }
}
