import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { NovelService } from '../../services/novel.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { ShowcommentComponent } from '../showcomment/showcomment.component';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  user: any;
  token!:string;
  nid:any;
  novel :any;
  uid :any;
  comments:any;
  setid:Number | undefined;
  commentForm = new FormGroup({
    id:new FormControl(''),
    comment : new FormControl(''),
    uid : new FormControl(''),
    bid : new FormControl(''),


  })
  

  constructor(private ns : NovelService, private router:Router, public local:LocalStorageService) { 
    this.loadNovel();
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

  addComment(){
    if(this.commentForm.value.comment == ''){ alert('โปรดกรอก comment ก่อนยืนยัน');
  }else{this.ns.addComment(this.commentForm.value).subscribe(
      data => {
        console.log(this.commentForm.value)
        console.log(data)
        this.ns.passnovelId(this.nid);
        alert('comment added successfully');
        this.commentForm.reset();  
        this.router.navigate(['/homepage']);
        
      },
      err =>{
        console.log(err);
      }
    );}
    
    
  }

  loadNovel(){
    try{
      console.log('load work')
      this.nid =this.ns.getnid();
      this.uid = this.ns.getuid();
      console.log(this.nid);
      console.log(this.uid);
      this.ns.getSomeComment(this.nid).subscribe(
        data => { 
          this.comments = data;
          this.setid=this.comments.length+1;
          console.log(this.setid)
          this.commentForm.setValue({
            id:this.setid,
            comment:"",
            uid:this.uid,
            bid:this.nid.id,
    
          })
        },
        err =>{
          console.log(err);
        }
      );
      
      console.log(this.commentForm.value)
      
    }catch(error){
      console.log(error)
    }
  }
  }