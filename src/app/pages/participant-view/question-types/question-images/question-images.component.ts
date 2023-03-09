import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-images',
  templateUrl: './question-images.component.html',
  styleUrls: ['./question-images.component.scss']
})
export class QuestionImagesComponent implements OnInit {
  @Input() question: string;
  @Input() options: any[]
  selected: any;
  loading = false;

  constructor() { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }
    , 100);
  }

  selectOption(option:any){
    this.selected = option;
  }

}
