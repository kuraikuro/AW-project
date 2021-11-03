import { Component, OnInit, } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-shownovelinformation',
  templateUrl: './shownovelinformation.component.html',
  styleUrls: ['./shownovelinformation.component.css']
})

export class ShownovelinformationComponent implements OnInit {

  user: any;
  token!:string;
  novel :any;
  uid:any;
  nid:any;
  wish ={
    uid:"",
    bid:"",
  }
  constructor(private ps: NovelService,private router:Router, public local:LocalStorageService) { 
    this.onLoading();
  }
  ngOnInit(): void {
    try {
      this.token = this.local.get('user').token
      this.ps.getAllUser(this.token).subscribe(
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
  onLoading(){
    try{
      this.nid =this.ps.getnid();
      console.log(this.nid);

      this.ps.getOneNovel(this.nid).subscribe(
        data => {
          this.novel = data;
          console.log(this.nid);
        },
          err=>{
            console.log(err)
          });
    }catch(error){
      console.log(error)
    }
  }
  update(){
    this.router.navigate(['/updatenovel']);
  }
  DeleteonClick(){
    try{
      console.log(this.nid)
      this.ps.deleteNovel(this.nid).subscribe(
        data => {
          this.novel = data;
          this.router.navigate(['/homepage']);
        },
          err=>{
            console.log(err)
          });
    }catch(error){
      console.log(error)
    }
  }
  
  ClickaddWish(){
    try{
      this.wish.bid = this.nid.id;
      this.wish.uid = this.uid;
      this.ps.addWish(this.wish).subscribe(
        data => {
          this.novel = data;
        },
          err=>{
            console.log(err)
          });
    }catch(error){
      console.log(error)
    }
  }
}
