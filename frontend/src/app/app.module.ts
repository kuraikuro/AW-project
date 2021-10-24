import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';
import { CreateComponent } from './components/create/create.component';
import { WishComponent } from './components/wish/wish.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomepageAComponent } from './components/homepage-a/homepage-a.component';
import { HomepageUComponent } from './components/homepage-u/homepage-u.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    WishComponent,
    SigninComponent,
    HomepageAComponent,
    HomepageUComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
