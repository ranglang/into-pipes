import { Pipe, PipeTransform  } from '@angular/core';
import {
  DatePipe,
  CurrencyPipe,
  DecimalPipe,
  JsonPipe,
  SlicePipe,
  UpperCasePipe,
  LowerCasePipe
} from '@angular/common';

import {MaskPipe} from './mask.pipe';
import {MapPipe} from './map.pipe';
import {LinkPipe} from './link.pipe';
import {ImagePipe} from './image.pipe';
import {PrependPipe} from './prepend.pipe';
import {AppendPipe} from './append.pipe';
import {WrapPipe} from './wrap.pipe';

@Pipe({name:'into'})
export class InToPipe implements PipeTransform{
transform(content: string, list: string): string {
    let result = content;
    let args:string[] = list.split(":");

    switch(args[0]){
        case "currency" : 
            // currency:en_US or currency
            result = new CurrencyPipe(args.length > 1 ? args[1] : "en_US").transform(content); 
            break;
        case "append" : 
            // append:something
            result = new AppendPipe().transform(content, args.length > 1 ? args[1] : ""); 
            break;
        case "prepend" : 
            // prepend:something
            result = new PrependPipe().transform(content, args.length > 1 ? args[1] : ""); 
            break;
        case "wrap" : 
            // wrap:something:something  OR wrap:something
            result = new WrapPipe().transform(content, args.length > 1 ? args[1] : "", args.length > 2 ? args[2] : args[1]); 
            break;
        case "number" : 
            // number:en_US:2   or number:en_US or number
            if (args.length > 2) {
                result = new DecimalPipe(args[1]).transform(content, args[2]);
            }else {
                result =  new DecimalPipe(args.length > 1 ? args[1] : "en_US").transform(content);
            }
            break;
        case "date" : 
            // date:en_US:MMDDYY OR date:MMDDYY
            if (args.length > 2) {
                result = new DatePipe(args[1]).transform(content, args[2]);
            }else {
                result =  new DatePipe("en_US").transform(content, args[1]);
            }
            break;
        case "json" : 
            // json
            result =  new JsonPipe().transform(content);
            break;
        case "slice" : 
            // slice 5:12 OR slice 5
            if (args.length > 2) {
                result = new SlicePipe().transform(content, parseInt(args[1], 10), parseInt(args[2], 10));
            }else {
                result =  new SlicePipe().transform(content, parseInt(args[1], 10));
            }
            break;
        case "uppercase" : 
            // uppercase
            result =  new UpperCasePipe().transform(content);
            break;
        case "lowercase" : 
            // lowercase
            result =  new LowerCasePipe().transform(content);
            break;
        case "mask" : 
            // mask:4:*  OR mask:4
            if (args.length > 2) {
                result = new MaskPipe().transform(content, parseInt(args[1], 10), args[2]);
            }else if (args.length > 1) {
                result =  new MaskPipe().transform(content, args[1]);
            } else {
                result =  new MaskPipe().transform(content);
            }
            break;
        case "map" : 
            // map
            result =  new MapPipe().transform(content, args.length > 1 ? args[1] : "");
            break;
        case "link" : 
            // link:target:text or link:text or link
            if (args.length > 2) {
                result =  new LinkPipe().transform(content, args[1], args[2]);
            } else if (args.length > 1) {
                result =  new LinkPipe().transform(content, "", args[1]);
            } else {
                const q = content.indexOf("?");
                const t = q < 0 ? content : content.substring(0, q);
                const d = t.lastIndexOf("/");
                const p = d < 0 ? t : t.substring(d+1);
                result =  new LinkPipe().transform(content, "", p);
            }
            break;
        case "image" : 
            // image:200px:auto:alttext OR image:200px:alternate-text OR image:200px OR image
            if (args.length > 3) {
                result =  new ImagePipe().transform(content, args[1], args[2], args[3]);
            } else if (args.length > 2) {
                result =  new ImagePipe().transform(content, args[1], args[2]);
            } else if (args.length > 1) {
                result =  new ImagePipe().transform(content, args[1]);
            } else {
                const q = content.indexOf("?");
                const t = q < 0 ? content : content.substring(0, q);
                const d = t.lastIndexOf("/");
                const p = d < 0 ? t : t.substring(d+1);
                result =  new ImagePipe().transform(content, p);
            }
            break;
    }
    return result;
  }
}