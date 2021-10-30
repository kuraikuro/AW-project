import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule} from '@angular/common/http';
import { CreateComponent } from './components/create/create.component';
import { WishComponent } from './components/wish/wish.component';
import { SigninComponent } from './components/signin/signin.component';
import { CommentComponent } from './components/comment/comment.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CreateuserComponent } from './components/createuser/createuser.component';




@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    WishComponent,
    SigninComponent,
    CommentComponent,
    HomepageComponent,
    CreateuserComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
