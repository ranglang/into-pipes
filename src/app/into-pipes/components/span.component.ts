import { Component } from '@angular/core';
import { PipeComponent } from '../interfaces/pipe.component';

@Component({
    selector: 'span-component',
    template: `<span [textContent]="source"></span>`,
    styles: [
        `
        `
    ]
})
export class SpanComponent implements PipeComponent {
	id: string;
	name: string;
    source: string;

    transform(source: any, args: any[]) {
        this.source = source
    }
}
