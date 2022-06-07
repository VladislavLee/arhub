import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, merge, Observable, of, startWith, switchMap} from "rxjs";
import {ModelViewerModalComponent} from "../../model-viewer-modal/model-viewer-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ImageViewerModalComponent} from "../../image-viewer-modal/image-viewer-modal.component";
import {PostService} from "../../../services/post.service";
import {API_URL_DATASTORE} from "../../../../URL_LIST";

@Component({
  selector: 'app-validation-image',
  templateUrl: './validation-image.component.html',
  styleUrls: ['./validation-image.component.scss']
})
export class ValidationImageComponent implements OnInit, AfterViewInit {

  readonly apiUrlDatastore =  API_URL_DATASTORE;
  displayedColumns: string[] = ['createdTime', 'title', 'markerVanillaMarkerId', 'modelId', 'valid', 'inValid'];
  data: any[] = [];
  // decimalPipe = new DecimalPipe(navigator.language);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  isValid = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private postService: PostService) {
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getRepoIssues();
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          if (data === null) {
            return [];
          }

          return data;
        }),
      )
      .subscribe((data: any) => {
        (this.data = data)
        this.changeDetector.detectChanges();
      });
  }

  openViewerModal(src?: any) {
    this.dialog.open(ModelViewerModalComponent, {
      data: {src: `${this.apiUrlDatastore}/content/${src.modelId}`},
    });
  }

  openViewerImageModal(src?: any) {
    console.log(src)
    this.dialog.open(ImageViewerModalComponent, {
      data: {src: `${this.apiUrlDatastore}/content/${src.markerVanillaMarkerId}`},
    });
  }

  validate(id: string) {
    console.log(id);
    this.isValid
      ? this.postService.validatePost(id).subscribe()
      : this.postService.validatePost(id).subscribe();
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Страниц: ';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} из ${length}`;
    };
  }

  getRepoIssues(): Observable<any> {
    return this.postService.getPostsByStatus("IN_PROGRESS");
  }
}


const ITEMS = [
  {
    "id": 1251606,
    "number": 240,
    "title": "Reworks the ",
    "labels": [],
    "image": "open",
    "comments": 0,
    "created_at": "2022-05-28T11:21:58Z",
    "updated_at": "2022-05-28T12:35:52Z",
    "model": 1
  },
  {
    "id": 12516006,
    "number": 240,
    "title": "Reworks the ",
    "labels": [],
    "image": "open",
    "comments": 0,
    "created_at": "2022-05-28T11:21:58Z",
    "updated_at": "2022-05-28T12:35:52Z",
    "model": 1
  },
  {
    "id": 12516906,
    "number": 290,
    "title": "Reworks the ",
    "labels": [],
    "image": "open",
    "comments": 0,
    "created_at": "2022-05-28T11:21:58Z",
    "updated_at": "2022-05-28T12:35:52Z",
    "model": 1
  },
  {
    "id": 125160236,
    "number": 24,
    "title": "Reworks the.",
    "labels": [],
    "image": "open",
    "comments": 0,
    "created_at": "2022-05-28T11:21:58Z",
    "updated_at": "2022-05-28T12:35:52Z",
    "model": 1
  },
  {
    "id": 125602906,
    "number": 90,
    "title": "Reworks the.",
    "labels": [],
    "image": "open",
    "comments": 0,
    "created_at": "2022-05-28T11:21:58Z",
    "updated_at": "2022-05-28T12:35:52Z",
    "model": 1
  },
]


