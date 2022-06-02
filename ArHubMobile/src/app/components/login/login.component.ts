import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // redirect to home if already logged in
    // if (false) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });

    // get return url from route parameters or default to '/
  }


  onSubmit() {
    this.submitted = true;

    window.localStorage.setItem('login', 'login')
    // stop here if form is invalid

    this.router.navigate(['/news'])
    this.loading = true;
    // this.authenticationService.login(
    //   this.f.username.value,
    //   this.f.password.value).subscribe(() =>
    //   this.router.navigate([this.returnUrl])
    // );
  }

}
