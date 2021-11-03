import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { NovelService } from 'src/app/services/novel.service';
@Component({
  selector: 'app-updatenovel',
  templateUrl: './updatenovel.component.html',
  styleUrls: ['./updatenovel.component.css']
})
export class UpdatenovelComponent implements OnInit {
  getId:any;
  novel:any;
  
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
  constructor(private ps: NovelService) {
    this.onLoading();

   }

  ngOnInit(): void {
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
  
  onChangeImg(e:any){
    if(e.target.files.length > 0){
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if(!file.type.match(pattern)){
        alert('invalid format');
        this.updateNovelForm
        .reset();
      }else{
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.updateNovelForm.patchValue({
            urlimg: reader.result
          });
        };
      }
    }
  }
  clickupdatenovel(){
    
    this.ps.updateNovel(this.updateNovelForm.value).subscribe(
      data =>{
        console.log(data)
        alert('novel updated successfully');
        this.updateNovelForm.reset();
      },
        err => {
          console.log(err);
        });
  }
}
