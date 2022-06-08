import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, combineLatest, mergeMap, tap} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {MapModalComponent} from "../map-modal/map-modal.component";
import {API_URL_DATASTORE, API_URL_MODEL_EDITOR, API_URL_REACT_VIEWER} from "../../../URL_LIST";

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss'],

})
export class CreationFormComponent implements OnInit {
  @Input() post: any;
  defaultSizeFiles = 100000000;

  loaded = false;
  safeSrc: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject<SafeResourceUrl>('');
  apiUrlReactViewer = API_URL_REACT_VIEWER;
  apiUrlModelEditor = API_URL_MODEL_EDITOR;
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<MapModalComponent, any> | undefined;
  saved = false;

  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    preview: new FormControl(null, Validators.required),
    marker: new FormControl(null, Validators.required),
    markerVanilla: new FormControl(null, Validators.required),
    model: new FormControl(null, Validators.required),
  })

  requestForm = {
    cityId: '03947b7b-b9c5-4ae0-b323-262c433bcbba',
    title: '',
    previewImageId: '',
    markerImageId: '',
    markerVanillaMarkerId: '',
    modelId: '',
    rotation: [0, 0, 0],
    scale: [1.005, 1.005, 1.005],
    translation: [0, 0, 0.1],
  };

  getPreviewFieldValid(): boolean {
    return this.form.get('preview')?.getError('incorrectSize');
  }

  getMarkerFieldValid(): boolean {
    return this.form.get('marker')?.getError('incorrectSize');
  }

  getModelFormatValid(): boolean {
    return this.form.get('model')?.getError('incorrectFormat');
  }

  getModelFieldValid(): boolean {
    return this.form.get('model')?.getError('incorrectSize');
  }

  getPreview(): boolean {
    return !!this.form.get('preview')?.value;
  }

  getMarker(): boolean {
    return !!this.form.get('marker')?.value;
  }

  getModel(): boolean {
    return !!this.form.get('model')?.value;
  }

  alarm(){
    this.postService.downloadImage(`${API_URL_DATASTORE}/content/75c6e`, 'marker').subscribe(value => {
      this.form.get('marker')?.setValue(new Blob([value.file]))
      this.loaded = false;
    })
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
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.postService.getFullPost(params.params.id).subscribe(post => {
          this.post = post;

          if (this.post) {
            console.log(this.post)
            combineLatest(
              // this.postService.downloadImage('https://material.angular.io/assets/img/examples/shiba2.jpg', 'preview'),
              // this.postService.downloadImage('https://material.angular.io/assets/img/examples/shiba2.jpg', 'marker'),
              // this.postService.downloadImage('https://material.angular.io/assets/img/examples/shiba2.jpg', 'markerVanilla'),
              // this.postService.downloadImage('https://material.angular.io/assets/img/examples/shiba2.jpg', 'model'),
              this.postService.downloadImage(`${API_URL_DATASTORE}/content/${this.post.previewImageId}`, 'preview'),
              this.postService.downloadImage(`${API_URL_DATASTORE}/content/${this.post.markerImageId}`, 'marker'),
              this.postService.downloadImage(`${API_URL_DATASTORE}/content/${this.post.markerVanillaMarkerId}`, 'markerVanilla'),
              this.postService.downloadImage(`${API_URL_DATASTORE}/content/${this.post.modelId}`, 'model'),
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
              console.log(formValue)
              this.form.patchValue(formValue);
            })
            // this.downloadImage(`${API_URL_DATASTORE}/content/${this.post.previewImageId}`, 'preview');
            // this.downloadImage(`${API_URL_DATASTORE}/content/${this.post.markerImageId}`, 'marker');
            // this.downloadImage(`${API_URL_DATASTORE}/content/${this.post.markerVanillaMarkerId}`, 'markerVanilla');
            // this.downloadImage(`${API_URL_DATASTORE}/content/${this.post.modelId}`, 'model');
          }
        })
      }
    });


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
    console.log(API_URL_REACT_VIEWER);
    this.safeSrc.next(this._sanitizer.bypassSecurityTrustResourceUrl(`${API_URL_REACT_VIEWER}/compiler`))
  }

  uploadMarker(event: any) {
    if (this.sizeValidation(event.target.files[0], 'marker')) {
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
  }

  uploadPreview(event: any) {
    if (this.sizeValidation(event.target.files[0], 'preview')) {
      this.form.get('preview')?.setValue(event.target.files[0]);
    }
  }

  uploadModel(event: any) {
    if(this.sizeValidation(event.target.files[0], 'model') &&
      this.formatValidation(event.target.files[0], 'model')) {
      this.form.get('model')?.setValue(event.target.files[0]);
    }
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
        this._router.navigate([`/model/${value}`])
      })
    } else {
      this.postService.postId$.subscribe(value => {
        this._router.navigate([`/model/${value}`])
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
          return this.postService.updatePost(request, this.post.id)
        } else {
          return this.postService.createPost(request);
        }

      })
    )
  }


  sizeValidation(file: any, formControlName: string): boolean {
      if (file.size > this.defaultSizeFiles) {
        this.form.get(formControlName)?.setErrors({incorrectSize: true})
        this.form.get(formControlName)?.setValue(null);
        return false;
      } else {
        this.form.get(formControlName)?.setErrors(null);
        this.form.get(formControlName)?.updateValueAndValidity();

        return true;
      }
  }

  formatValidation(file: any, formControlName: string): boolean {
    const fileType = file.name.split('.').pop();

    if (fileType !== 'glb') {
      this.form.get(formControlName)?.setErrors({incorrectFormat: true})
      this.form.get(formControlName)?.setValue(null);

      return false;
    } else {
      this.form.get(formControlName)?.setErrors(null);
      this.form.get(formControlName)?.updateValueAndValidity();

      return true;
    }
  }

  getErrorMessage() {
    return 'Файл не должен превышать размер в 100Мб';
  }
}
