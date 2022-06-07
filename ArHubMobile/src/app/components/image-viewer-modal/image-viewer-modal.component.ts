import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-image-viewer-modal',
  templateUrl: './image-viewer-modal.component.html',
  styleUrls: ['./image-viewer-modal.component.scss']
})
export class ImageViewerModalComponent implements OnInit {
  src = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

  constructor(
    public dialogRef: MatDialogRef<ImageViewerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.src = this.data.src
  }

  close() {
    this.dialogRef.close();
  }
}
