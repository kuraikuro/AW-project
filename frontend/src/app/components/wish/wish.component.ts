import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NovelService } from 'src/app/services/novel.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
  wish = new FormControl('');
  constructor(private ns: NovelService) { }
  ngOnInit() {
    
    }
  

  
}
