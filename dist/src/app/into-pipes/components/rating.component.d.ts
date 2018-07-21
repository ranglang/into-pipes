import { EventEmitter } from '@angular/core';
import { PipeComponent } from '../interfaces/pipe.component';
export declare class RatingComponent implements PipeComponent {
    source: string;
    id: string;
    name: string;
    value: any[];
    float: any;
    onIntoComponentChange: EventEmitter<any>;
    transform(source: any, data: any, args: any[]): void;
}
