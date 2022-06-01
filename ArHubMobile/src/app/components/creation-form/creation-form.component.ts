import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, combineLatest, mergeMap, tap} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {MapModalComponent} from "../map-modal/map-modal.component";

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss'],

})
export class CreationFormComponent implements OnInit {
  @Input() post: any;

  loaded = false;
  safeSrc: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject<SafeResourceUrl>('');
  apiUrlReactViewer = environment.API_URL_REACT_VIEWER;
  apiUrlModelEditor = environment.API_URL_MODEL_EDITOR;
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<MapModalComponent, any> | undefined;
  saved = false;

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    preview: new FormControl(null, Validators.required),
    marker: new FormControl(null, Validators.required),
    markerVanilla: new FormControl(null, Validators.required),
    model: new FormControl(null, Validators.required),
  })

  requestForm = {
    cityId: 'f33b7246-9ebf-4706-85d7-23c256cffa33',
    title: '',
    previewImageId: '',
    markerImageId: '',
    markerVanillaMarkerId: '',
    modelId: '',
    rotation: [0, 0, 0],
    scale: [1.005, 1.005, 1.005],
    translation: [0, 0, 0.1],
  };

  getPreview(): boolean {
    return !!this.form.get('preview')?.value;
  }

  getMarker(): boolean {
    return !!this.form.get('marker')?.value;
  }

  getModel(): boolean {
    return !!this.form.get('model')?.value;
  }

  constructor(
    private postService: PostService,
    private http: HttpClient,
    protected _sanitizer: DomSanitizer,
    private _router: Router,
    public matDialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.post) {
      combineLatest(
        // this.postService.downloadImage('https://material.angular.io/assets/img/examples/shiba2.jpg', 'preview'),
        // this.postService.downloadImage('https://material.angular.io/assets/img/examples/shiba2.jpg', 'marker'),
        // this.postService.downloadImage('https://material.angular.io/assets/img/examples/shiba2.jpg', 'markerVanilla'),
        // this.postService.downloadImage('https://material.angular.io/assets/img/examples/shiba2.jpg', 'model'),
        this.postService.downloadImage(`${environment.API_URL_DATASTORE}/content/${this.post.previewImageId}`, 'preview'),
        this.postService.downloadImage(`${environment.API_URL_DATASTORE}/content/${this.post.markerImageId}`, 'marker'),
        this.postService.downloadImage(`${environment.API_URL_DATASTORE}/content/${this.post.markerVanillaMarkerId}`, 'markerVanilla'),
        this.postService.downloadImage(`${environment.API_URL_DATASTORE}/content/${this.post.modelId}`, 'model'),
      ).pipe(
        tap(value => console.log(value))
      ).subscribe(value => {
        let arr = value.reduce((map: any, obj: any) => {
          map[obj.name] = obj.file;
          return map;
        }, {});

        const {preview, marker, markerVanilla, model} = arr;

        const formValue = {
          title: this.post.title,
          preview: new File([preview], 'file'),
          marker: new File([marker], 'file'),
          markerVanilla: new File([markerVanilla], 'file'),
          model: new File([model], 'file'),
        }

        this.form.patchValue(formValue);
      })
      // this.downloadImage(`${environment.API_URL_DATASTORE}/content/${this.post.previewImageId}`, 'preview');
      // this.downloadImage(`${environment.API_URL_DATASTORE}/content/${this.post.markerImageId}`, 'marker');
      // this.downloadImage(`${environment.API_URL_DATASTORE}/content/${this.post.markerVanillaMarkerId}`, 'markerVanilla');
      // this.downloadImage(`${environment.API_URL_DATASTORE}/content/${this.post.modelId}`, 'model');
    }


    this.route.paramMap.subscribe((params: any) => {
      console.log(params.params.id);
      this.safeSrc.next(this._sanitizer.bypassSecurityTrustResourceUrl(`${this.apiUrlModelEditor}/${params.params.id}`));
    });

    document.onclick = (args: any): void => {
      if (args.target.tagName === 'BODY') {
        this.modalDialog?.close()
      }
    }

    window.addEventListener("message", (event) => {
      if (event.data.action == 'returnData') {
        this.form.get('marker')?.setValue(new Blob([event.data.item]))
        this.loaded = false;
      }
    }, false);

    this.safeSrc.next(this._sanitizer.bypassSecurityTrustResourceUrl(`${this.apiUrlReactViewer}/compiler`))
  }

  uploadMarker(event: any) {
    this.loaded = true;
    this.form.get('markerVanilla')?.setValue(event.target.files[0])
    var iframe = document.getElementById('frame');
    var iWindow = (<HTMLIFrameElement>iframe).contentWindow;

    console.log(event.target.files)
    iWindow?.postMessage({
      action: 'save',
      key: 'keyForData',
      type: 'message',
      value: event.target.files,
    }, '*')
  }

  uploadPreview(event: any) {
    console.log(event.target.files[0])
    this.form.get('preview')?.setValue(event.target.files[0]);
  }

  uploadModel(event: any) {
    this.form.get('model')?.setValue(event.target.files[0]);
  }

  openMapModal() {
    this.dialogConfig.id = "projects-modal-component";
    this.dialogConfig.height = "80%";
    this.dialogConfig.width = "80%";

    if (!this.saved) {
      this.save().subscribe(value => {
        this.saved = !this.saved
        this.postService.postId$.next(value)
        this.modalDialog = this.matDialog.open(MapModalComponent, this.dialogConfig);
      })
    } else {
      this.modalDialog = this.matDialog.open(MapModalComponent, this.dialogConfig);
    }
  }


  onSubmit() {
    if (!this.saved) {
      this.save().subscribe(value => {
        this._router.navigate([`${this.apiUrlModelEditor}/${value}`])
      })
    } else {
      this.postService.postId$.subscribe(value => {
        this._router.navigate([`${this.apiUrlModelEditor}/${value}`])
      })
    }
  }

  save() {
    console.log(this.form.value)
    return combineLatest(
      this.postService.uploadFile(this.form.get('preview')?.value, 'preview'),
      this.postService.uploadFile(this.form.get('marker')?.value, 'marker'),
      this.postService.uploadImage(this.form.get('markerVanilla')?.value, 'markerVanilla'),
      this.postService.uploadModel(this.form.get('model')?.value, 'model'),
    ).pipe(
      mergeMap((value: any) => {
        let request = {
          ...this.requestForm,
        }


        console.log(value)
        request.previewImageId = value.find((item: any) => item.name === 'preview')?.id as string;
        request.markerImageId = value.find((item: any) => item.name === 'marker')?.id as string;
        request.modelId = value.find((item: any) => item.name === 'model')?.id as string;
        request.markerVanillaMarkerId = value.find((item: any) => item.name === 'markerVanilla')?.id as string;
        request.title = this.form.get('title')?.value;

        console.log(request);

        if (this.post) {
          return this.postService.updatePost(request)
        } else {
          return this.postService.createPost(request);
        }

      })
    )
  }
}
