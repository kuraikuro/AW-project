import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatenovel',
  templateUrl: './updatenovel.component.html',
  styleUrls: ['./updatenovel.component.css']
})
export class UpdatenovelComponent implements OnInit {

  updateNovelForm = new FormGroup({
  name:new FormControl('',[Validators.required]),
	price :new FormControl('',[Validators.required]),
	shortnote : new FormControl('',[Validators.required]),
	publisher : new FormControl('',[Validators.required]),
  file: new FormControl('',[Validators.required]),
  urlimg: new FormControl('',[Validators.required]),
  })
  constructor() { }

  ngOnInit(): void {
  }

}
