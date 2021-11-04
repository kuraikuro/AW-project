import { Component, OnInit } from '@angular/core';
import { ShowcommentComponent } from '../showcomment/showcomment.component';
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

  constructor(private upc: NovelService, private router:Router, public local:LocalStorageService) { }

  ngOnInit(): void {
    try {
      this.token = this.local.get('user').token
      this.upc.getAllUser(this.token).subscribe(
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

}