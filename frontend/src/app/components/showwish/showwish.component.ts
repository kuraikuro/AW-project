import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NovelService } from 'src/app/services/novel.service';


@Component({
  selector: 'app-showwish',
  templateUrl: './showwish.component.html',
  styleUrls: ['./showwish.component.css']
})
export class ShowwishComponent implements OnInit {
  wishs: any
  uid = "616c25b293bf9f9e178336f9"
  wid = "616c25cd93bf9f9e178336fd"


  constructor(private ns : NovelService) { 
    this.showWish();
   }

  ngOnInit(): void {
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
