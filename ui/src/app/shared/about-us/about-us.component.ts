import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  //

  paraMessage: string =
    'Blood bank is a place where blood bag that is collected from blood donation events is stored in one place. The term "Blood Bank" refers to a division of hospital laboratory where the storage of blood products occurs and proper testing is performed tot reduce the risk of transfusion related events.';

  imgLink: string =
    'https://partheniumprojects.com/wp-content/uploads/2018/12/Blood-Bank-1.jpg';
}
