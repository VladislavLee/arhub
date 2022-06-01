import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {API_URL_MODEL_EDITOR} from "../../../URL_LIST";

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.css']
})
export class ModelEditorComponent implements OnInit {
  safeSrc: BehaviorSubject<SafeResourceUrl> = new BehaviorSubject<SafeResourceUrl>('');
  apiUrlModelEditor = API_URL_MODEL_EDITOR;
  constructor(private route: ActivatedRoute, protected _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      console.log(params.params.id)
      this.safeSrc.next(this._sanitizer.bypassSecurityTrustResourceUrl(`${this.apiUrlModelEditor}/${params.params.id}`));
    });
  }

}
