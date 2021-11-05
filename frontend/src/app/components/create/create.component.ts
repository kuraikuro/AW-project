import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NovelService } from 'src/app/services/novel.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user: any;
  token!:string;

  createForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    price : new FormControl('',[Validators.required]),
    shortnote : new FormControl('',[Validators.required]),
	  publisher : new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
	  urlimg : new FormControl('',[Validators.required]),
  });
  
  previewLoaded: boolean = false;

  get id() { 
    return this.createForm.get('id'); 
  }
  get name() { 
    return this.createForm.get('name'); 
  }
  get price() { 
    return this.createForm.get('price'); 
  }
  get publisher() { 
    return this.createForm.get('price'); 
  }
  get shortnote() { 
    return this.createForm.get('shortnote'); 
  }

  constructor( private cn: NovelService, private router:Router, public local:LocalStorageService) { }

  ngOnInit(): void {
    try {
      this.token = this.local.get('user').token
      this.cn.getAllUser(this.token).subscribe(
        data => {
          this.user = data;
        },
        err => {
          this.router.navigate(['/homepage']);
        }
      );
    } catch (error) {
      console.log(error);
      this.router.navigate(['/homepage']);
    }
  }

  addNovel(){
    if((this.createForm.value.id == '') || 
    (this.createForm.value.name == '') || 
    (this.createForm.value.price == '') ||
    (this.createForm.value.shortnote == '') ||
    (this.createForm.value.publisher == '') ||
    (this.createForm.value.file == '') ||
    (this.createForm.value.urlimg == '')
    ){
      alert('โปรดกรอกลายระเอียดหนังสือแนะนำให้ครบถ้วน');
    }else{
    this.cn.addNovel(this.createForm.value).subscribe(
      data => {
        console.log(data)
        alert('บันทึกหนังสือแนะนำเรียบร้อย');
        this.createForm.reset();
        this.router.navigate(['/homepage'])
      },
        err => {
          console.log(err);
        });
    }
  }

  onChangeImg(e:any){
    if(e.target.files.length > 0){
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if(!file.type.match(pattern)){
        alert('invalid format');
        this.createForm.reset();
      }else{
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.createForm.patchValue({
            urlimg: reader.result
          });
        };
      }
    }
  }

  cancel(){
    this.router.navigate(['/homepage'])
  }

}
