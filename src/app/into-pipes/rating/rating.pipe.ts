/*
* Defines a filter to convert url into a raiting display.
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'raiting' })
export class RatingPipe implements PipeTransform {
    static transformationMethod() {
        const x = function  (content: any, args: string[], callback?: any, data?: any) {
            return new RatingPipe().transform(content, ""); 
        };
        return x;
    }
    rateString(source) {
        const value = parseInt(source, 10);
        const float = parseFloat(source);

        let x = "<span class='rating'>";
        for (let i = 0; i < value; i++ ) {
            x += "<span class='fa fa-star' aria-hidden='true'></span>"
        }
        if ( float !== value ) {
            x += "<span class='fa fa-star-half' aria-hidden='true'></span>"
        }
        x += "</span><span class='rate-value'>" + source + "</span>";

        return x;
    }

    transform(source: any, ...args: any[]): any {
        if ((typeof source === "string") || !(source instanceof Array)) {
            return this.rateString(source);
        } else {
            const result = [];
            source.map((item) => {
                result.push(this.rateString(item));
            });
            return result;                
        }
    }
}
