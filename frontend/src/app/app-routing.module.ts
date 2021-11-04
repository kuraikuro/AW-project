import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { SigninComponent } from './components/signin/signin.component';
import { ShownovelComponent } from './components/shownovel/shownovel.component';
import { UpdatenovelComponent } from './components/updatenovel/updatenovel.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CommentComponent } from './components/comment/comment.component';
import { ShowcommentComponent } from './components/showcomment/showcomment.component';
import { UpdatecommentComponent } from './components/updatecomment/updatecomment.component';
import { ShowwishComponent } from './components/showwish/showwish.component';


const routes: Routes = [
  {path: 'signin', component: SigninComponent },
  {path: 'create', component: CreateComponent },
  {path: 'shownovel', component: ShownovelComponent },
  {path: 'updatenovel', component: UpdatenovelComponent },
  {path: 'createuser', component: CreateuserComponent },
  {path: 'homepage', component: HomepageComponent },  
  {path: 'comment', component: CommentComponent },
  {path: 'showcomment', component: ShowcommentComponent },
  {path: 'updatecomment', component: UpdatecommentComponent },
  {path: 'showwish', component: ShowwishComponent },
  {path: '', 
    redirectTo: 'signin',
    pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
