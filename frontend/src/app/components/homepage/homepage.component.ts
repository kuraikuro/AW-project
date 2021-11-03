import { Component, OnInit, Input } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @Input() user:any;
  nid={};
  novel: any;

  constructor(private home: NovelService, private router:Router) {
    this.onLoading();
   }

  ngOnInit(): void {
  }

  onLoading(){
    try{
      this.home.getOneNovel(this.nid).subscribe(
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
  
  onShownovel(){
    this.router.navigate(['/shownovel'])
  }

}
