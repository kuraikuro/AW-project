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
  uid = "616c25b293bf9f9e178336f9"
  wid = "616c25cd93bf9f9e178336fd"


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

  showWish(){
    try{
      this.ns.getSomeWish(this.uid).subscribe(
        data => {
          this.wishs = data;
        },
        err =>{
          console.log(err);
        }
      );
    }catch (error){
      console.log(error);
    }
  }
  
  deleteWish(){
    try{
      this.ns.deleteWish(this.wid).subscribe(
        data => {
          this.wishs = data;
        },
          err=>{
            console.log(err)
          });
    }catch(error){
      console.log(error)
    }
  }
}
