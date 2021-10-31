import { Component, OnInit } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
@Component({
  selector: 'app-shownovelinformation',
  templateUrl: './shownovelinformation.component.html',
  styleUrls: ['./shownovelinformation.component.css']
})
export class ShownovelinformationComponent implements OnInit {
  novel :any
  nid ="617e554103a70c085ffeacd7";
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
      this.ps.addWish(this.nid).subscribe(
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
