import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date | string | null): string | null {
    const format: string = 'MMM dd, yyyy | hh.mm a';

    if (date == null) {
      return 'No Data';
    }

    return new DatePipe('en-US').transform(date, format);
  }
}
