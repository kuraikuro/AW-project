import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
  "name" :String;
	"price" :Number;
	"shortnote" : String;
	"publisher" : String;
	"releasedate" :Date;
	"urlimg" :String;
	"wish":String;
	"comment":String;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<any>('http://localhost:3000/api/resource').subscribe(data => {
      this.name = data.name;
      this.price = data.price;
      this.shortnote = data.shortnote;
      this.publisher = data.publisher;
      this.releasedate = data.releasedate;
      this.urlimg = data.urlimg;
      this.wish = data.wish;
      this.comment = data.comment;

    })
  }
}