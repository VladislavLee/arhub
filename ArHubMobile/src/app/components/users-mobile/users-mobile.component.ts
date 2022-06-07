import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'app-users-mobile',
  templateUrl: './users-mobile.component.html',
  styleUrls: ['./users-mobile.component.scss']
})
export class UsersMobileComponent implements OnInit {
  @Input() subscribers: any;

  constructor(private userService: UserService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.userService.getUserById(params.params.id).subscribe(user => {
            this.subscribers = user.subscribers;
        })
      }
    });
  }

  getUserById(id: string) {
    this.userService.getUserById(id).subscribe(user => {
      console.log(this.route.routeConfig)

    })
  }
}
