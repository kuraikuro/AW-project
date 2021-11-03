import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class NovelService {
  allnovels:any;
  onenovels:any;
  comments:any;
  wishs:any;
  oneuser:any;
  uid:any;
  nid:any;
  user:any;

  constructor(private http:HttpClient, public local:LocalStorageService) { }

  passnovelId(rawdata:any){
    this.nid = rawdata;
    console.log('passid')
  }
  getnid(){
    console.log(this.nid)
    return this.nid;
  }
  passuId(rawdata:any){
    this.uid = rawdata;
    console.log('passid')
  }
  getuid(){
    console.log(this.uid)
    return this.nid;
  }
  signIn(userData: any){
    return this.http.post<any>('http://localhost:3000/login/signin',userData)
    .pipe(map(data =>{
        if(data){
          this.local.set('user', data, 1, 'w');
          console.log('service');
          console.log(this.local.get('user'));
          this.uid = this.local.get('user');
        }
        return this.uid;
    }));
  }

  signUp(userData: any){
    return this.http.post<any>('http://localhost:3000/user/signup',userData)
    .pipe(map(data =>{
      if(data){
       
      }
      return data;
  }));
  }

  getAllUser(token: any){
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/novel/homepage',{headers})
    .pipe(map(data =>{
        if(data){
         this.user = data;
         console.log(data);
        }
        return data;
    }));
  }

  addNovel(novel:any){
    return this.http.post<any>('http://localhost:3000/novel/add',novel)
    .pipe(map(data =>{
      return data;
    }));
  }
  getallNovel(){
    console.log('work')
    return this.http.get<any>('http://localhost:3000/novel/get')
    .pipe(map(data =>{
      if(data){
        this.allnovels = data;
        console.log(this.allnovels);
      }
      return this.allnovels;
    }));
  }

  getOneNovel(nid :any){
    console.log(nid);
    return this.http.post<any>('http://localhost:3000/novel/getone',nid)
    .pipe(map(data =>{
      if(data){
        this.onenovels = data;
        console.log(this.onenovels);
      }
      return this.onenovels;
    }));
  }
  updateNovel(newnovel:any){
    console.log(newnovel);
    return this.http.put<any>('http://localhost:3000/novel/update',newnovel)
    .pipe(map(data =>{
      return data;
    }));
  }
  deleteNovel(dnid:any){
    let options ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:dnid,
    };
    console.log(dnid)
    return this.http.delete<any>('http://localhost:3000/novel/delete',options)
    .pipe(map(data =>{
      return data;
    }));
  }

  addUser(user:any){
    return this.http.post<any>('http://localhost:3000/user/add',user)
    .pipe(map(data =>{
      return data;
    }));
  }
  
  addComment(comment:any){
    return this.http.post<any>('http://localhost:3000/comment/add',comment)
    .pipe(map(data =>{
      return data;
    }));
  }
  getSomeComment(nid:any){
    return this.http.post<any>('http://localhost:3000/novel/comment',nid)
    .pipe(map(data =>{
      if(data){
        this.comments = data;
        console.log(this.comments);
      }
      return this.comments;
    }));
  }
  addWish(wish:any){
    return this.http.post<any>('http://localhost:3000/wish/add',wish)
    .pipe(map(data =>{
      return data;
    }));
  }
  getSomeWish(uid:any){
    return this.http.post<any>('http://localhost:3000/user/wish',uid)
    .pipe(map(data =>{
      if(data){
        this.wishs = data;
        console.log(this.wishs);
      }
      return this.wishs;
    }));
  }
  deleteWish(wid:any){
    return this.http.delete<any>('http://localhost:3000/wish/delete',wid)
    .pipe(map(data =>{
      return data;
    }));
  }

}
