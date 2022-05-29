import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import {RouterModule} from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { ActionsComponent } from './components/actions/actions.component';
import { NewsComponent } from './components/news/news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { FooterComponent } from './components/footer/footer.component';
import { MobileFooterComponent } from './components/mobile-footer/mobile-footer.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { PostMiniComponent } from './components/post-mini/post-mini.component';
import { SliderStoriesComponent } from './components/slider-stories/slider-stories.component';
import {SwiperModule} from "swiper/angular";
import { MyPostDesktopComponent } from './components/my-post-desktop/my-post-desktop.component';
import { MyPostComponent } from './components/my-post/my-post.component';
import {MatMenuModule} from "@angular/material/menu";
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreationFormComponent } from './components/creation-form/creation-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccountDesktopComponent } from './components/account-desktop/account-desktop.component';
import { NewsDesktopComponent } from './components/news-desktop/news-desktop.component';
import { PostArComponent } from './components/post-ar/post-ar.component';
import { SliderDesktopComponent } from './components/slider-desktop/slider-desktop.component';
import { PopularPostComponent } from './components/popular-post/popular-post.component';
import {PostService} from "./services/post.service";
import {HttpClientModule} from "@angular/common/http";
import { ArViewerComponent } from './components/ar-viewer/ar-viewer.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {DeviceDetectorGuard} from "./guards/device-detector.guard";
import { ModelViewerModalComponent } from './components/model-viewer-modal/model-viewer-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ModelEditorComponent } from './components/model-editor/model-editor.component';
import { SliderPostFullComponent } from './components/slider-post-full/slider-post-full.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { ValidationImageComponent } from './components/admin-panel/validation-image/validation-image.component';
import { PostValidationComponent } from './components/admin-panel/post-validation/post-validation.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ImageViewerModalComponent } from './components/image-viewer-modal/image-viewer-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HeaderComponent,
    ActionsComponent,
    NewsComponent,
    FooterComponent,
    MobileFooterComponent,
    MobileHeaderComponent,
    PageTitleComponent,
    PostMiniComponent,
    SliderStoriesComponent,
    MyPostDesktopComponent,
    MyPostComponent,
    CreatePostComponent,
    CreationFormComponent,
    AccountDesktopComponent,
    NewsDesktopComponent,
    PostArComponent,
    SliderDesktopComponent,
    PopularPostComponent,
    ArViewerComponent,
    ModelViewerModalComponent,
    ModelEditorComponent,
    SliderPostFullComponent,
    ValidationImageComponent,
    PostValidationComponent,
    ImageViewerModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: NewsComponent
      },
      {
        path: 'news',
        component: NewsComponent,
        // canActivate: [DeviceDetectorGuard]
      },
      {
        path: 'my-post',
        component: MyPostDesktopComponent
      },
      {
        path: 'news-desktop',
        component: NewsDesktopComponent
      },
      {
        path: 'new-post',
        component: CreatePostComponent
      },
      {
        path: 'ar-viewer',
        component: ArViewerComponent
      },
      {
        path: 'model/:id',
        component: ModelEditorComponent
      },
      {
        path: 'account',
        component: AccountDesktopComponent
      },
      {
        path: 'admin/validation',
        component: ValidationImageComponent
      }
    ]),

    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    SwiperModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    InfiniteScrollModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    ModelViewerModalComponent,
    ImageViewerModalComponent,
  ],
  providers: [
    PostService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
