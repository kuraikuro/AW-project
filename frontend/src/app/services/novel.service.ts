import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NovelService {
  allnovels:any;
  onenovels:any;
  comments:any;
  wishs:any;
  oneuser:any;


  constructor(private http:HttpClient) { }

  addNovel(novel:any){
    return this.http.post<any>('http://localhost:3000/novel/add',novel)
    .pipe(map(data =>{
      return data;
    }));
  }
  getallNovel(){
    return this.http.get<any>('http://localhost:3000/novel/get')
    .pipe(map(data =>{
      if(data){
        this.allnovels = data;
        console.log(this.allnovels);
      }
      return this.allnovels;
    }));
  }
  getOneNovel(nid:any){
    return this.http.get<any>('http://localhost:3000/novel/getone',nid)
    .pipe(map(data =>{
      if(data){
        this.onenovels = data;
        console.log(this.onenovels);
      }
      return this.onenovels;
    }));
  }
  updateNovel(newnovel:any){
    return this.http.put<any>('http://localhost:3000/novel/add',newnovel)
    .pipe(map(data =>{
      return data;
    }));
  }
  deleteNovel(nid:any){
    return this.http.delete<any>('http://localhost:3000/novel/delete',nid)
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
    return this.http.get<any>('http://localhost:3000/novel/comment',nid)
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
    return this.http.get<any>('http://localhost:3000/user/wish',uid)
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
