import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {PostService} from "../../services/post.service";
import {API_URL_DATASTORE} from "../../../URL_LIST";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss']
})
export class CommentsModalComponent implements OnInit {
  comments: any;
  myName: any;
  apiUrlDatastore = API_URL_DATASTORE;
  isMobile: boolean;

  form = new FormGroup({
    comment: new FormControl('')
  })

  constructor(private _bottomSheetRef: MatBottomSheetRef<CommentsModalComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private postService: PostService,
              private router: Router,
              private deviceService: DeviceDetectorService,
              private formBuilder: FormBuilder) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(): void {
    this.myName = window.localStorage.getItem('login');

    this.isMobile = this.deviceService.isMobile();

    this.getComments();
  }

  getComments() {

    this.postService.getComments(this.data.id).subscribe((value) => {
      console.log(value)
      this.comments = value;
    });
  }

  addComment() {
    console.log(this.form.get('comment')?.value)
    this.postService.addComment(this.form.get('comment')?.value, this.data.id).subscribe(() => {
      this.getComments()
      this.form.get('comment')?.setValue(null);
    });
  }

  openProfileUser(userId: string) {
    this._bottomSheetRef.dismiss();
    this.router.navigate([`/user-mobile/${userId}`])
  }

  openProfileUserDesktop(userId: string) {
    this._bottomSheetRef.dismiss();
    this.router.navigate([`/user/${userId}`])
  }

  openMyProfileDesktop() {
    this._bottomSheetRef.dismiss();
    this.router.navigate(['/account']);
  }

  openMyProfile() {
    this._bottomSheetRef.dismiss();
    this.router.navigate(['/account-mobile']);
  }
}
