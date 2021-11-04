import { Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service'; 

@Component({
  selector: 'app-showcomment',
  templateUrl: './showcomment.component.html',
  styleUrls: ['./showcomment.component.css']
})
export class ShowcommentComponent implements OnInit {
  comments: any;
  nid :any;
  uid:any;

  constructor(private ns : NovelService, private router:Router) { 
    this.showComment();

   }

  ngOnInit(): void {
  }

  showComment(){
    
    try{
      this.nid=this.ns.getnid();
      this.ns.getSomeComment(this.nid).subscribe(
        data => {
          this.comments = data;
        },
        err =>{
          console.log(err);
        }
      );
    }catch (error){
      console.log(error);
    }
  }

   edit(i:any){
     console.log(this.comments[i])
     this.ns.passcommentId(this.comments[i])
     this.router.navigate(['/updatecomment']);
   }

}