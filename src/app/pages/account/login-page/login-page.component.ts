import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
public form!: FormGroup;

  constructor(private data: DataService,
    private fb: FormBuilder) {
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

  ngOnInit() {

  }
}
