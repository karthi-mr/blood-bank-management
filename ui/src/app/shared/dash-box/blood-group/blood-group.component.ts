import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.scss'],
})
export class BloodGroupComponent {
  //

  @Input() name: string = '';
  @Input() value: number = 0;
}
