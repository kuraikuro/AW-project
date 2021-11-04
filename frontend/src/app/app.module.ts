import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularWebStorageModule } from 'angular-web-storage';

import { HttpClientModule} from '@angular/common/http';
import { CreateComponent } from './components/create/create.component';
import { SigninComponent } from './components/signin/signin.component';
import { CommentComponent } from './components/comment/comment.component';

import { ShowcommentComponent } from './components/showcomment/showcomment.component';

import { HomepageComponent } from './components/homepage/homepage.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { ShownovelComponent } from './components/shownovel/shownovel.component';
import { ShownovelinformationComponent } from './components/shownovelinformation/shownovelinformation.component';
import { UpdatenovelComponent } from './components/updatenovel/updatenovel.component';
import { ShowwishComponent } from './components/showwish/showwish.component';
import { UpdatecommentComponent } from './components/updatecomment/updatecomment.component';





@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    SigninComponent,
    CommentComponent,
    ShowcommentComponent,
    HomepageComponent,
    CreateuserComponent,
    ShownovelComponent,
    ShownovelinformationComponent,
    UpdatenovelComponent,
    ShowwishComponent,
    UpdatecommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularWebStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
