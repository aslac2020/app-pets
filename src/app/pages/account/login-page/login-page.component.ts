import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public busy = false;

  constructor(private service: DataService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createFormIsBlank();
    const token = localStorage.getItem('petshop.token');
    if (token) {
      this.busy = true;
      this.service.refreshToken()
        .subscribe((data: any) => {
          localStorage.setItem('petshop.token', data.token)
          this.busy = false;
        },
          (err) => {
            localStorage.clear();
            this.busy = false;
          }
        );
    }
  }

  createFormIsBlank() {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  submit() {
    this.busy = true;
    this.service.authenticate(this.form.value)
      .subscribe((data: any) => {
        localStorage.setItem('petshop.token', data.token)
        this.busy = false;
      },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      )
  }
}
