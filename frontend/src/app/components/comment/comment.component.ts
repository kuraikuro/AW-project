import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { NovelService } from '../../services/novel.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment = new FormControl('');

  constructor(private ns : NovelService) { }

  ngOnInit(): void {
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