import { state } from '@angular/animations';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let status: string | null = null;
    
    switch(value) {
      case 1:
        status = "Approved";
        break;
      case 2:
        status = "Pending";
        break;
      case 3:
        status = "Rejected";
        break;
    }
    
    return status;
  }

}
