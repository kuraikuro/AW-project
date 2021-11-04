import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service'; 

@Component({
  selector: 'app-showcomment',
  templateUrl: './showcomment.component.html',
  styleUrls: ['./showcomment.component.css']
})
export class ShowcommentComponent implements OnInit {
  comments: any
  nid = "2"
  uid = "10001"
  oneusers = "abc"
  book = new FormGroup({
    bid: new FormControl('2')
  })

  constructor(private ns : NovelService, private router:Router) { 
    this.showComment();
    this.showUser();
   }

  ngOnInit(): void {
  }

  showComment(){
    console.log(this.book.value)
    try{
      this.ns.getSomeComment(this.book.value).subscribe(
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

  showUser(){
    try{
      this.ns.getAllUser(this.uid).subscribe(
        data => {
          this.oneusers = data;
        },
        err =>{
          console.log(err);
        }
      );
    }catch (error){
      console.log(error);
    }
  }
   edit(){
     this.router.navigate(['/updatecomment']);
   }

}