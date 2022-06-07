import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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
    private userService: UserService
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
    if(this.loginForm.get("username")?.value != this.loginForm.get("password")?.value){
      return;
    }

    window.localStorage.setItem('login', 'login')
    // stop here if form is invalid

    //
    this.loading = true;
    const username = this.loginForm.get("username")?.value;

    this.userService.getUserIdByUsername(username).subscribe(value => {
      if(value === null){
        console.log("not login")
      } else {
        console.log(value)
        window.localStorage.setItem('login', username)
        this.router.navigate(['/news'])
      }
    })

    // this.authenticationService.login(
    //   this.f.username.value,
    //   this.f.password.value).subscribe(() =>
    //   this.router.navigate([this.returnUrl])
    // );
  }

}
