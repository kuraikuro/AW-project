import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userinfo: any;
  userData!: number;
  homepageData!: number;
  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor( private user:NovelService, private router:Router ) { }

  ngOnInit(): void {
  }

  signin(){
    if((this.userForm.value.username == '') || 
    (this.userForm.value.password == '') 
    ){
      alert('โปรดกรอกยูเซอร์เนมและรหัสผ่านเพื่อทำการเข้าสู่ระบบ');
    }else{
    this.user.signIn(this.userForm.value).subscribe(
      data => {
        if(data.status == true){
          this.userinfo = data;
          this.router.navigate(['/homepage']);
          console.log('go next')
          console.log(this.userinfo);
        }
      },
      err =>{
        console.log(err);
      });
    }
  }

  signup(){
    this.router.navigate(['/createuser']);
  }

}
