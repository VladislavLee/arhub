import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-model-viewer-modal',
  templateUrl: './model-viewer-modal.component.html',
  styleUrls: ['./model-viewer-modal.component.scss']
})
export class ModelViewerModalComponent implements OnInit {
  src = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
  camera_orbit = '45deg 55deg 2.5m';
  isMobile: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModelViewerModalComponent>,
    private deviceService: DeviceDetectorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.src = this.data.src;
    this.isMobile = this.deviceService.isMobile();
  }

  close() {
    this.dialogRef.close();
  }

  openModelRedactor() {

  }
}
