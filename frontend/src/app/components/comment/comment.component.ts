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

  comment = new FormControl('');

  constructor(private ns : NovelService, private router:Router, public local:LocalStorageService) { }

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
    this.ns.addComment(this.comment.value).subscribe(
      data => {
        console.log(data)
        alert('comment added successfully');
        this.comment.reset();
      },
      err =>{
        console.log(err);
      }
    )
  }

  

  }