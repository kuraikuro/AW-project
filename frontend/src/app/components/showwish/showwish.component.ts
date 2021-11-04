import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NovelService } from 'src/app/services/novel.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-showwish',
  templateUrl: './showwish.component.html',
  styleUrls: ['./showwish.component.css']
})
export class ShowwishComponent implements OnInit {
  user: any;
  token!:string;
  wishs: any
  uid:any;
  wn:any[] = [];
  constructor(private ns : NovelService, private router:Router, public local:LocalStorageService) { 
    this.showWish();
   }

  ngOnInit(): void {
    try {
      this.token = this.local.get('user').token
      this.ns.getAllUser(this.token).subscribe(
        data => {
          this.user = data;
        },
        err => {
          this.router.navigate(['/signin']);
        }
      );
    } catch (error) {
      console.log(error);
      this.router.navigate(['/signin']);
    }
  }
  loadnovel(){
    console.log(this.wishs);
    for(let i = 0 ; i< this.wishs.length;i++)
    {this.ns.getOneForWish(this.wishs[i]).subscribe(
    data => {
      console.log(data)
      this.wn.push(data[0]);
    }
  )}
    console.log(this.wn)
  }
  showWish(){
    this.uid=this.ns.getuid();
    try{
      this.ns.getSomeWish(this.uid).subscribe(
        data => {
          this.wishs = data;
          this.loadnovel();
        },
        err =>{
          console.log(err);
        }
      );
    }catch (error){
      console.log(error);
    }
  }
  
  deleteWish(i:any){
    try{
      console.log(this.wishs[i].uid)
      this.ns.deleteWish(this.wishs[i]).subscribe(
        data => {
          this.wishs = data;
          window.location.reload();
        },
          err=>{
            console.log(err)
          });
    }catch(error){
      console.log(error)
    }
  }
}
