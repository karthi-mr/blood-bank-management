import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodGroup } from 'src/app/shared/shared.model';
import { SharedService } from 'src/app/shared/shared.service';
import { PatientService } from '../../patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestBlood } from '../../patient.model';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.scss']
})
export class RequestEditComponent {

  requestBloodForm!: FormGroup;
  bloodGroups: BloodGroup[] = [];

  constructor(private sharedService: SharedService,
              private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.initRequestForm();
      this.sharedService.get_blood_group().subscribe({
        next: (data: any) => {
          // console.log(data);
          this.bloodGroups = data;
        }
      });
  }

  initRequestForm(): void {
    this.requestBloodForm = new FormGroup({
      patient_name: new FormControl('', [Validators.required]),
      patient_age: new FormControl('' , [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      blood_group: new FormControl('', [Validators.required]),
    })
  }

  onSubmitBloodRequestForm(): void {
    const donateBlood: RequestBlood = this.requestBloodForm.value;

    this.patientService.request_blood(this.requestBloodForm.value).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.router.navigate(['../request-blood'], {relativeTo: this.route});
      }
    });
  }
}
