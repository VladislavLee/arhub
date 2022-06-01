import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModelViewerModalComponent} from "../model-viewer-modal/model-viewer-modal.component";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {
  @Input() post: any;
  apiUrlDatastore = environment.API_URL_DATASTORE;

  constructor(private dialog: MatDialog, private _router: Router) { }

  ngOnInit(): void {
    console.log(this.post)
  }

  openViewerModal() {
    this.dialog.open(ModelViewerModalComponent, {
      width: '250px',
      data: {src: `${environment.API_URL_DATASTORE}/content/${this.post.modelId}`, id: this.post.id},
    });
  }

  editPost(id: string) {
    this._router.navigate([`/new-post/${id}`]);
  }
}
