import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyData',
})
export class EmptyDataPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == '' || value == null) {
      return 'No Data';
    }
    return value;
  }
}
