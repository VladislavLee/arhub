import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, merge, Observable, of, startWith, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { DecimalPipe } from '@angular/common';
import {ModelViewerModalComponent} from "../../model-viewer-modal/model-viewer-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ImageViewerModalComponent} from "../../image-viewer-modal/image-viewer-modal.component";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-validation-image',
  templateUrl: './validation-image.component.html',
  styleUrls: ['./validation-image.component.scss']
})
export class ValidationImageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['created', 'title', 'image', 'model', 'valid', 'inValid'];
  exampleDatabase: ExampleHttpDatabase | null;
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
    this.exampleDatabase = new ExampleHttpDatabase();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          );
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          return data.items;
        }),
      )
      .subscribe(data => {
        (this.data = data)
        this.changeDetector.detectChanges();
      });
  }

  openViewerModal(src?: any) {
    this.dialog.open(ModelViewerModalComponent, {
      data: {src: src},
    });
  }

  openViewerImageModal(src?: any) {
    this.dialog.open(ImageViewerModalComponent, {
      data: {src: src},
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
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  getRepoIssues(sort: string, order: any, page: number): Observable<any> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
      page + 1
    }`;

    const data = {
      total_count: 24874,
      items: ITEMS
    }

    return of(data);
    // return this._httpClient.get<any>(requestUrl);
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


