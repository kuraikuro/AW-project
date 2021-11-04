import { Component, OnInit } from '@angular/core';
import { ShowcommentComponent } from '../showcomment/showcomment.component';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { NovelService } from 'src/app/services/novel.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-updatecomment',
  templateUrl: './updatecomment.component.html',
  styleUrls: ['./updatecomment.component.css']
})
export class UpdatecommentComponent implements OnInit {

  user: any;
  token!:string;
  getId:any;
  comment:any;
  
  updateCommentForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    comment: new FormControl('',[Validators.required])
  })
  previewLoaded: boolean = false;

  constructor(private ps: NovelService, private router:Router, public local:LocalStorageService) { 
    this.LoadComment();
  }

  ngOnInit(): void {
    try {
      this.token = this.local.get('user').token
      this.ps.getAllUser(this.token).subscribe(
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
  LoadComment(){
    this.getId = this.ps.getcomment();
    console.log(this.getId)
    this.ps.getOneComment(this.getId).subscribe(
      data => {
        this.comment = data;
        console.log(this.comment[0].id);
        this.updateCommentForm.setValue({
          id:this.comment[0].id,
          comment:this.comment[0].comment,
        });
      },
      err =>{
        console.log(err)
      }
    );
    console.log(this.updateCommentForm.value)
  }

  clickupdatecommnet(){
    this.ps.updateComment(this.updateCommentForm.value).subscribe(
      data =>{
        console.log(data)
        alert('comment update successfully');
        this.updateCommentForm.reset();
      },
      err =>{
        console.log(err);
      }
    );
  }
  backpage(){
    this.router.navigate(['/showcomment']);

  }

}