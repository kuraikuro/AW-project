import { Component, OnInit } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
@Component({
  selector: 'app-shownovelinformation',
  templateUrl: './shownovelinformation.component.html',
  styleUrls: ['./shownovelinformation.component.css']
})
export class ShownovelinformationComponent implements OnInit {
  novel :any
  novelid :any
  constructor(private ps: NovelService) { 
    this.onLoading();
  }
  ngOnInit(): void {
  }
  onLoading(){
    try{
      this.ps.getOneNovel(this.novelid).subscribe(
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
