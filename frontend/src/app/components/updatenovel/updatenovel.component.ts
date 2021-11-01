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
  novelinfo:any;updateNovelForm = new FormGroup({
    id:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    price :new FormControl('',[Validators.required]),
    shortnote : new FormControl('',[Validators.required]),
    publisher : new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    urlimg: new FormControl('',[Validators.required]),
    })
  constructor(private ps: NovelService) {
    this.getId = "617e7dfe32e81229ee715841";
    this.ps.getOneNovel(this.getId).subscribe(res =>{
      this.updateNovelForm.setValue({
        id:res['id'],
        name:res['name'],
	      price :res['price'],
	      shortnote : res['shortnote'],
	      publisher : res['publisher'],
        file: res['file'],
        urlimg: res['urlimg'],
      })
    })
   }

  ngOnInit(): void {
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
