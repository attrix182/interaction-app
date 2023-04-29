import { Component, Input, OnInit } from '@angular/core';
import { VoteModel } from 'src/app/models/vote.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-question-images',
  templateUrl: './question-images.component.html',
  styleUrls: ['./question-images.component.scss']
})
export class QuestionImagesComponent implements OnInit {
  @Input() question: string;
  @Input() options: any[];
  @Input() eventID: string;
  @Input() page: number;
  @Input() user: string;
  @Input() votes: VoteModel[];
  selected: any;
  loading = false;

  constructor(private storageSvc: StorageService) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.filterVotesByPage();
    }, 100);
  }

  filterVotesByPage() {
    this.votes = this.votes.filter((vote) => vote.page == this.page);
    this.votes.forEach((vote) => {
      if (vote.user == this.user) {
        this.selected = this.options.find((option) => option.id == vote.option);
      }
    });
  }

  selectOption(option: any) {
    if (this.selected) {
      return;
    }
    this.selected = option;

    let vote: VoteModel = {
      page: this.page,
      option: option.id,
      event: this.eventID,
      user: this.user,
      color: this.getRandomColor()
    };

    this.storageSvc.Insert('votes', vote);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
