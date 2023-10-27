import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public form!: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ){
    this.createFormIsBlank();
  }

  ngOnInit(){
this.formIsValue();
  }

  createFormIsBlank() {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required])
      ],
      document: [{ value: '', disabled: true}
    ],
    email: ['', Validators.compose([
      Validators.minLength(5),
      Validators.maxLength(120),
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])
  ]
    })
  }

  formIsValue(){
    this.busy = true;
    this.service
    .getProfile()
    .subscribe(
      (data: any) => {
        this.busy = false;
      this.form.controls['name'].setValue(data.name);
      this.form.controls['document'].setValue(data.document);
      this.form.controls['email'].setValue(data.email);

      },
      (err: any) => {
        console.log(err);
        this.busy = false;
      }
    )
  }

  submit() {
    this.busy = true;
    this.service.updateProfile(this.form.value)
      .subscribe((data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Atualização Completa!');
      },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      )
  }

}
