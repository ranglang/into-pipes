import { PipeTransform } from '@angular/core';
export declare class TablePipe implements PipeTransform {
    static transformationMethod(): (content: any, args: string[], callback?: any, data?: any) => any;
    transform(source: any, ...args: any[]): any;
    private buildTable(source, rows, headers);
    private getHeaders(obj, headers);
}
