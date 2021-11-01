import { Component, OnInit } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
@Component({
  selector: 'app-shownovelinformation',
  templateUrl: './shownovelinformation.component.html',
  styleUrls: ['./shownovelinformation.component.css']
})
export class ShownovelinformationComponent implements OnInit {
  novel :any
  userid = "617e632d20e1ef242529ddeb";
  nid ={"_id":"617e7e2432e81229ee715847"};
  wish ={
    uid:"",
    bid:"",
  }
  constructor(private ps: NovelService) { 
    this.onLoading();
  }
  ngOnInit(): void {
  }
  onLoading(){
    try{
      this.ps.getOneNovel(this.nid).subscribe(
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
  DeleteonClick(){
    try{
      this.ps.deleteNovel(this.nid).subscribe(
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
  
  ClickaddWish(){
    try{
      this.wish.bid = this.nid._id;
      this.wish.uid = this.userid;
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
