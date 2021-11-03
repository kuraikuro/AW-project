import { Component, OnInit, Input } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  user: any;
  token!:string;
  novel: any;
  nid ={
    id:"1001"
  }
  constructor(private home: NovelService, private router:Router, public local:LocalStorageService) {
   }

  ngOnInit(): void {
    try {
      this.token = this.local.get('user').token
      this.home.getAllUser(this.token).subscribe(
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
    this.onLoading();
  }
  onLoading(){
    try{
     this.home.getallNovel().subscribe(
      data => {
        this.novel = data;
        console.log(this.novel);
      },
        err=>{
          console.log(err)
        });
        
    }catch(error){
      console.log(error)
    }
  }
  onClickNovel(value:any){
    this.nid.id =value;
    this.home.passnovelId(this.nid);
    this.router.navigate(['/shownovel']);
  }

}
