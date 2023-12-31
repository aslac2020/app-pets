import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  public form!: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ){this.createFormIsBlank()}


  ngOnInit(){
  }

  createFormIsBlank() {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required])
      ],
      document: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])
    ],
    email: ['', Validators.compose([
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])
  ],
  password: ['', Validators.compose([
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.required])
  ],
    })
  }

  submit(){
    this.busy = true;
    this.service
    .create(this.form.value)
    .subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Bem-Vindo!');
        this.router.navigate(['/login'])
      },
      (err: any) => {
        console.log(err);
        this.busy = false;
      }
    )
  }

}
