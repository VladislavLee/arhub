import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../../services/post.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, combineLatest, merge, mergeMap, of} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss'],

})
export class CreationFormComponent implements OnInit {
  loaded = false;
  safeSrc: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject<SafeResourceUrl>('');
  apiUrlReactViewer = environment.API_URL_REACT_VIEWER;
  apiUrlModelEditor = environment.API_URL_MODEL_EDITOR;

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    preview: new FormControl(null, Validators.required),
    marker: new FormControl(null, Validators.required),
    markerVanilla: new FormControl(null, Validators.required),
    model: new FormControl(null, Validators.required),
  })

  requestForm = {
    cityId: 'e7a4af38-3636-4a3b-8e76-a8f89a49b3d5',
    title: '',
    previewImageId: '',
    markerImageId: '',
    markerVanillaMarkerId: '',
    modelId: '',
    rotation: [0, 0, 0],
    scale: [1.005, 1.005, 1.005],
    translation: [0, 0, 0.1],
  };

  constructor(
    private postService: PostService,
    private http: HttpClient,
    protected _sanitizer: DomSanitizer,
    private _router: Router
  ) {}

  ngOnInit(): void {
    window.addEventListener("message", (event) => {
      if (event.data.action == 'returnData') {
        this.form.get('marker')?.setValue(new Blob([event.data.item]))
      }
    }, false);

    this.safeSrc.next(this._sanitizer.bypassSecurityTrustResourceUrl(`${this.apiUrlReactViewer}/compiler`))
  }

  uploadMarker(event: any) {
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
      this.form.get('preview')?.setValue(event.target.files[0]);
  }

  uploadModel(event: any) {
    this.form.get('model')?.setValue(event.target.files[0]);
  }

  onSubmit() {
    console.log(this.form.value)
    combineLatest(
      this.postService.uploadFile(this.form.get('preview')?.value, 'preview'),
      this.postService.uploadFile(this.form.get('marker')?.value, 'marker'),
      this.postService.uploadImage(this.form.get('markerVanilla')?.value, 'markerVanilla'),
      this.postService.uploadModel(this.form.get('model')?.value,  'model'),
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

        return this.postService.createPost(request);
        //
        // request.previewImageId
        // this.postService.createPost()
      })
    ).subscribe(value => {
      this._router.navigate([`${this.apiUrlModelEditor}/${value}`])
    })
  }
}
