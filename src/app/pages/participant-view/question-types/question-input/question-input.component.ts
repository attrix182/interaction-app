import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { VoteModel } from 'src/app/models/vote.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit {
  @ViewChild('answerInput') answerInput: any;
  @Input() question: string;
  @Input() options: any[];
  @Input() eventID: string;
  @Input() page: number;
  @Input() user: string;
  @Input() resultsVisibility: boolean;
  @Input() votes: VoteModel[];
  answer: string;
  loading = false;

  constructor(private storageSvc: StorageService) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log(this.votes);
      this.setVote();
    }, 300);
  }

  setVote() {
    this.votes.forEach((vote) => {
      if (vote.user == this.user) {
        this.answer = vote.answer;
        this.answerInput.nativeElement.disabled = true;
      }
    });
  }

  publishAnswer() {
    if (this.answer.toString().length == 0) return;
    this.answerInput.nativeElement.disabled = true;
    this.answer = this.answer.trim();
    let vote: VoteModel = {
      page: this.page,
      answer: this.answer,
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





