import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comment = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
