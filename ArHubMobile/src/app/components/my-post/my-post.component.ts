import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModelViewerModalComponent} from "../model-viewer-modal/model-viewer-modal.component";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {API_URL_DATASTORE} from "../../../URL_LIST";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {
  @Input() post: any;
  apiUrlDatastore = API_URL_DATASTORE;
  isMobile: boolean;

  constructor(private dialog: MatDialog, private _router: Router, private deviceService: DeviceDetectorService ) { }

  ngOnInit(): void {
    console.log(this.post)
    this.isMobile = this.deviceService.isMobile();
  }

  openViewerModal() {
    this.dialog.open(ModelViewerModalComponent, {
      width: '250px',
      data: {src: `${API_URL_DATASTORE}/content/${this.post.modelId}`, id: this.post.id},
    });
  }

  editPost(id: string) {
    this._router.navigate([`/new-post/${id}`]);
  }
}
