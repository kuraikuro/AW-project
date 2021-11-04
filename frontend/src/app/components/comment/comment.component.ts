import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { NovelService } from '../../services/novel.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
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

  commentForm = new FormGroup({
    comments : new FormControl(''),
    users : new FormControl(''),
    nids : new FormControl(''),


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
    this.ns.addComment(this.commentForm.value).subscribe(
      
      data => {
        console.log(this.commentForm.value)
        console.log(data)
        this.ns.passnovelId(this.nid);
        alert('comment added successfully');
        this.commentForm.reset();
        window.location.reload();
      },
      err =>{
        console.log(err);
      }
    )
  }

  loadNovel(){
    try{
      this.nid =this.ns.getnid();
      this.uid = this.ns.getuid();
      console.log(this.nid);
      this.commentForm.setValue({
        comment:"",
        nid:this.nid,
        uid:this.uid,

      })
 
      
    }catch(error){
      console.log(error)
    }
  }

  

  }