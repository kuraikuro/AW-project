import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { NovelService } from 'src/app/services/novel.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-updatenovel',
  templateUrl: './updatenovel.component.html',
  styleUrls: ['./updatenovel.component.css']
})
export class UpdatenovelComponent implements OnInit {
  getId:any;
  novel:any;
  user: any;
  token!:string;
  
  updateNovelForm = new FormGroup({
    id:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    price :new FormControl('',[Validators.required]),
    shortnote : new FormControl('',[Validators.required]),
    publisher : new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    urlimg: new FormControl('',[Validators.required]),
    })
    previewLoaded: boolean = false;
  constructor(private ps: NovelService, private router:Router, public local:LocalStorageService) {
    this.onLoading();

   }

  ngOnInit(): void {
    try {
      this.token = this.local.get('user').token
      this.ps.getAllUser(this.token).subscribe(
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
  onLoading(){
    this.getId = this.ps.getnid();
    console.log(this.getId)
    this.ps.getOneNovel(this.getId).subscribe(
      data => {
        this.novel = data;
        console.log(this.novel[0].id);
        this.updateNovelForm.setValue({
          id:this.novel[0].id,
          name:this.novel[0].name,
          price :this.novel[0].price,
          shortnote : this.novel[0].shortnote,
          publisher : this.novel[0].publisher,
          file: this.novel[0].file,
          urlimg: this.novel[0].urlimg,
    
        });
      },
        err=>{
          console.log(err)
        });
    
    console.log(this.updateNovelForm.value)
  }
  get name(){
    return this.updateNovelForm.get('name') as FormControl;
  }
  get price(){
    return this.updateNovelForm.get('price') as FormControl;
  }
  get shortnote(){
    return this.updateNovelForm.get('shortnote') as FormControl;
  }
  get publisher(){
    return this.updateNovelForm.get('publisher') as FormControl;
  }
 
  clickupdatenovel(){
    
    if((this.updateNovelForm.value.name == '') || 
    (this.updateNovelForm.value.shortnote == '') || 
    (this.updateNovelForm.value.publisher == '') 
    ){
      alert('โปรดกรอกลายระเอียดให้ครบถ้วน');
    }else{
    this.ps.updateNovel(this.updateNovelForm.value).subscribe(
      data =>{
        console.log(data)
        alert('แก้ไขนิยายสำเร็จ');
        this.ps.passnovelId(this.getId);
        this.router.navigate(['/shownovel']);
      },
        err => {
          console.log(err);
        });
      }
  }
}
