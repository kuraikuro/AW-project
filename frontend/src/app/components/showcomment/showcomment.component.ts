import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms'
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

  constructor(private ns : NovelService) { 
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
      this.ns.getOneUser(this.uid).subscribe(
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
   

}