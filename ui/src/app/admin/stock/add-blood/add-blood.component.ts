import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-blood',
  templateUrl: './add-blood.component.html',
  styleUrls: ['./add-blood.component.scss'],
})
export class AddBloodComponent implements OnInit {
  addBloodForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addBloodForm = new FormGroup({
      blood_group: new FormControl('', [Validators.required]),
    });
  }

  onSubmitForm(): void {
    this.adminService.add_blood_group(this.addBloodForm.value).subscribe({
      next: (data: any) => {
        this.router.navigate(['../blood-stock'], { relativeTo: this.route });
      },
    });
  }

  onClickCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
