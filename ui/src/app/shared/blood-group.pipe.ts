import { BloodGroup } from './shared.model';
import { SharedService } from './shared.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bloodGroup'
})
export class BloodGroupPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: number, ...args: unknown[]): unknown {

    // console.log(value);

    // console.log(this.sharedService.blood_groups_array[0]);

    return this.sharedService.blood_groups_array[value].blood_group;

    // return 1;
  }

}
