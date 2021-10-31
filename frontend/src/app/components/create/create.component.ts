import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NovelService } from 'src/app/services/novel.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    price : new FormControl('',[Validators.required]),
    shortnote : new FormControl('',[Validators.required]),
	  publisher : new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
	  urlimg : new FormControl('',[Validators.required]),
  })
  previewLoaded: boolean = false;

  constructor( private cn: NovelService) { }

  ngOnInit(): void {
  }

  addNovel(){
    this.cn.addNovel(this.createForm.value).subscribe(
      data => {
        console.log(data)
        alert('บันทึกงานเขียนเรียบร้อย');
        this.createForm.reset();
      },
        err => {
          console.log(err);
        });
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
            img: reader.result
          });
        };
      }
    }
  }

}
