import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dash-box',
  templateUrl: './dash-box.component.html',
  styleUrls: ['./dash-box.component.scss']
})
export class DashBoxComponent {
  
  @Input() name: string = '';
  @Input() value: number = 0;
}
