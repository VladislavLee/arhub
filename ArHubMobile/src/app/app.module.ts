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
import { PopularPostComponent } from './components/popular-post/popular-post.component';
import {PostService} from "./services/post.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ArViewerComponent } from './components/ar-viewer/ar-viewer.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
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
import {MapModalComponent} from "./components/map-modal/map-modal.component";
import { CommentsModalComponent } from './components/comments-modal/comments-modal.component';
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import { AccountMobileComponent } from './components/account-mobile/account-mobile.component';
import { MapMobileComponent } from './components/map-mobile/map-mobile.component';
import {DeviceDetectorGuard} from "./guards/device-detector.guard";
import {MatSidenavModule} from "@angular/material/sidenav";
import { LoginComponent } from './components/login/login.component';
import {AuntificationGuard} from "./guards/auntification.guard";
import { UserAccountMobileComponent } from './components/user-account-mobile/user-account-mobile.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { MyPostMobileComponent } from './components/my-post-mobile/my-post-mobile.component';
import {fwcAPIInterceptor} from "./interceptors/fwc-api-interceptor.interceptor";
import { UsersMobileComponent } from './components/users-mobile/users-mobile.component';
import { UserCardMobileComponent } from './components/user-card-mobile/user-card-mobile.component';
import {AdminGuard} from "./guards/admin.guard";

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
    PopularPostComponent,
    ArViewerComponent,
    ModelViewerModalComponent,
    ModelEditorComponent,
    SliderPostFullComponent,
    ValidationImageComponent,
    PostValidationComponent,
    ImageViewerModalComponent,
    MapModalComponent,
    CommentsModalComponent,
    MapModalComponent,
    AccountMobileComponent,
    MapMobileComponent,
    LoginComponent,
    UserAccountMobileComponent,
    UserAccountComponent,
    MyPostMobileComponent,
    UsersMobileComponent,
    UserCardMobileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: NewsComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'news',
        component: NewsComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'news-desktop',
        component: NewsDesktopComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'my-post',
        component: MyPostDesktopComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'my-post-mobile',
        component: MyPostMobileComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'new-post',
        component: CreatePostComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'ar-viewer',
        component: ArViewerComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'model/:id',
        component: ModelEditorComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'account',
        component: AccountDesktopComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'account-mobile',
        component: AccountMobileComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'admin/validation',
        component: ValidationImageComponent,
        canActivate: [AuntificationGuard, AdminGuard]
      },
      {
        path: 'new-post/:id',
        component: CreatePostComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'user-mobile/:id',
        component: UserAccountMobileComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'user/:id',
        component: UserAccountComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'users-mobile',
        component: UsersMobileComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'map',
        component: MapMobileComponent,
        canActivate: [AuntificationGuard, DeviceDetectorGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]),

    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatBottomSheetModule,
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
    MatListModule,
    MatSidenavModule,
  ],
  entryComponents: [
    ModelViewerModalComponent,
    ImageViewerModalComponent,
    CommentsModalComponent,
    MapModalComponent
  ],
  providers: [
    PostService,
    {provide: HTTP_INTERCEPTORS, useClass: fwcAPIInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
