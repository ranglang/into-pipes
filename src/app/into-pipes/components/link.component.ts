import { Component, EventEmitter } from '@angular/core';
import { PipeComponent } from '../interfaces/pipe.component';

@Component({
    selector: 'link-component',
    template: `<a [href]="source" [target]="target" [textContent]="title"></a>`,
    styles: [
        `
        :host {display:table;float:left;min-height: 23px}
        `
    ]
})
export class LinkComponent implements PipeComponent {
    source: string;
	id: string;
	name: string;
    title: string;
    target: string;
	onIntoComponentChange: EventEmitter<any>;

    transform(source: any, data: any, args: any[]) {
        this.source = source;
        this.target = (args && args.length) ? args[0] : "";
        this.title = (args && args.length > 1) ? args[1] : "";
    
        if(!this.title || !this.title.length) {
            const q = source.indexOf("?");
            const t = q < 0 ? source : source.substring(0, q);
            const d = t.lastIndexOf("/");
            this.title = d < 0 ? t : t.substring(d+1);
        }
    }
}
