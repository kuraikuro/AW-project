import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovelService } from 'src/app/services/novel.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
  })

  get email() { 
    return this.userForm.get('email'); 
  }

  get username() { 
    return this.userForm.get('username'); 
  }

  get password() { 
    return this.userForm.get('password'); 
  }

  constructor(private cuser:NovelService, private router:Router) { }

  ngOnInit(): void {
  }

  signup(){
    if((this.userForm.value.email == '') || 
    (this.userForm.value.username == '') || 
    (this.userForm.value.password == '') 
    ){
      alert('โปรดกรอกลายระเอียดบัญชีให้ครบถ้วน');
    }else{
    this.cuser.signUp(this.userForm.value).subscribe(
      data => {
        console.log(data)
        alert('สมัครสมาชิกสำเร็จ');
        this.router.navigate(['/signin']);
      },
      err=>{
        console.log(err);
        alert('สมัคสมาชิกล้มเหลว ยูเซอร์เนมนี้ถูกใช้ไปแล้ว')
      });
    }
  }

  cancel(){
    this.router.navigate(['/signin'])
  }

}
