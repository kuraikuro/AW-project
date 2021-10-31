import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { SigninComponent } from './components/signin/signin.component';
import { ShownovelComponent } from './components/shownovel/shownovel.component';
import { UpdatenovelComponent } from './components/updatenovel/updatenovel.component';

const routes: Routes = [
  {path: 'signin', component: SigninComponent },
  {path: 'create', component: CreateComponent },
  {path: 'shownovel', component: ShownovelComponent },
  {path: 'updatenovel', component: UpdatenovelComponent },
  {path: 'createuser', component: CreateuserComponent },
  {path: '', 
    redirectTo: 'signin',
    pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
