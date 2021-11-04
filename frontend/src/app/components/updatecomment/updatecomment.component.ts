import { Component, OnInit } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { ShowcommentComponent } from '../showcomment/showcomment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatecomment',
  templateUrl: './updatecomment.component.html',
  styleUrls: ['./updatecomment.component.css']
})
export class UpdatecommentComponent implements OnInit {
  getId:any;
  comment:any;

  updateCommentForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    comment: new FormControl('',[Validators.required]),
    uid : new FormControl(''),
    bid : new FormControl(''),
  })
  previewLoaded: boolean = false;

  constructor(private ps: NovelService, private router:Router) { 
    this.LoadComment();
  }

  ngOnInit(): void {
  }

  LoadComment(){
    this.getId = this.ps.getcid();
    console.log(this.getId.id)
    this.updateCommentForm.setValue({
      id:this.getId.id,
      comment:this.getId.comment,
      uid:this.getId.uid,
      bid:this.getId.bid
    });
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