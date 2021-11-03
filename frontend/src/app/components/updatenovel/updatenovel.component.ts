import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    
  constructor(private ps: NovelService) {
    this.onLoading();
    
   }

  ngOnInit(): void {
  }
  onLoading(){
    this.getId = this.ps.getnid();
    console.log(this.getId)
    this.ps.getOneNovel(this.getId).subscribe(res =>{
      this.novel = res;
      console.log(this.novel)
      this.updateNovelForm.setValue({
        id:this.novel.id
      });
      console.log(this.updateNovelForm.value)
    })
    
  }
  clickupdatenovel(){

    this.updateNovelForm.setValue({
      id:this.novel.id
    })
    if(this.updateNovelForm.valueChanges)
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
