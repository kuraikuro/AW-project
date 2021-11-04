import { Component, OnInit, ViewChild } from '@angular/core';
import { NovelService } from 'src/app/services/novel.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { ShownovelinformationComponent } from '../shownovelinformation/shownovelinformation.component';

@Component({
  selector: 'app-shownovel',
  templateUrl: './shownovel.component.html',
  styleUrls: ['./shownovel.component.css']
})
export class ShownovelComponent implements OnInit {

  @ViewChild(ShownovelinformationComponent)
  showinfo!: ShownovelinformationComponent;
  user: any;
  token!:string;

  constructor(private sn: NovelService, private router:Router, public local:LocalStorageService) { }

  ngOnInit(): void {
    try {
      this.token = this.local.get('user').token
      this.sn.getAllUser(this.token).subscribe(
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

  onClickaddWist(){
    this.showinfo.ClickaddWish();
  }

  onClickupdatet(){
    this.showinfo.update();
  }

  onClickDelete(){
    this.showinfo.DeleteonClick();
  }

}
