import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

class DialogData {
}

@Component({
  selector: 'app-model-viewer-modal',
  templateUrl: './model-viewer-modal.component.html',
  styleUrls: ['./model-viewer-modal.component.scss']
})
export class ModelViewerModalComponent implements OnInit {
  src = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
  camera_orbit = '45deg 55deg 2.5m';

  constructor(
    public dialogRef: MatDialogRef<ModelViewerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
