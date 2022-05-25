import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModelViewerModalComponent} from "../model-viewer-modal/model-viewer-modal.component";

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openViewerModal() {
    this.dialog.open(ModelViewerModalComponent);
  }
}
