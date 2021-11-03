import { Component, OnInit } from '@angular/core';
import { ShowcommentComponent } from '../showcomment/showcomment.component';
import { NovelService } from 'src/app/services/novel.service';


@Component({
  selector: 'app-updatecomment',
  templateUrl: './updatecomment.component.html',
  styleUrls: ['./updatecomment.component.css']
})
export class UpdatecommentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}