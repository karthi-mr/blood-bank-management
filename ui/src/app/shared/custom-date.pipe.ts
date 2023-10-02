import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: Date | string): string | null{

    const format: string = "MMM dd, yyyy | hh.mm a";

    return new DatePipe('en-US').transform(date, format);
  }

}
