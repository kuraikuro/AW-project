import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  })

  constructor(private cuser:NovelService, private router:Router) { }

  ngOnInit(): void {
  }

  signup(){
    this.cuser.signUp(this.userForm.value).subscribe(
      data => {
        alert(data.message)
        this.router.navigate(['/signin']);
      },
      err=>{
        alert('สมัคสมาชิคล้มเหลว')
      }
    )
  }

  cancel(){
    this.router.navigate(['/signin'])
  }

}
