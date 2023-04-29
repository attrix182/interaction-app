import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EventSesion } from 'src/app/models/event.model';
import { VoteModel } from 'src/app/models/vote.model';
import { AlertService } from 'src/app/services/alerts.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/shared/primeng/form.validator';
import { QuestionImagesComponent } from './question-types/question-images/question-images.component';

@Component({
  selector: 'fc-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.scss']
})
export class ParticipantViewComponent extends FormValidator implements OnInit {
  @ViewChild ('question') question: QuestionImagesComponent;
  loading: boolean = false;
  getId = this.router.url.split('/')[2].trim();
  event: EventSesion;
  override formGroup: any;
  userName: any = undefined;
  activeUsers: any[] = undefined;
  eventData: any;
  actualPage = 0;
  votes: VoteModel[];


  constructor(
    private storageSvc: StorageService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private messageService: MessageService
  ) {
    super();
    this.loading = true;
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.getSesion();
    this.getVotes();
    this.getUserName();
  }

  getVotes() {
    this.storageSvc.GetByParameter('votes', 'event', this.getId).subscribe((res: any) => {
      this.votes = res;
      console.log(this.votes);
      if(this.votes.length == 0){
        this.question.selected = undefined;
      }
    });
  }

  changeName() {
    localStorage.removeItem('user-name');
    this.getUserName();
  }

  getUser() {
    console.log(this.activeUsers);
    return this.activeUsers.find((u) => u.name == this.userName);
  }



  definirMensajesError(): void {}

  getSesion() {
    this.loading = true;
    let aux = this.getId;
    this.storageSvc.GetByParameter('events', 'id', aux).subscribe((res: any) => {
      this.event = res[0];
      this.actualPage = res[0].actualPage;
      this.eventData = res[0].questions; //res[0].data;
      this.loading = false;
      this.validateExistingEvent();
    });
  }

  validateExistingEvent() {
    if (!this.event) {
      this.router.navigateByUrl('');
    }
  }

  async getUserName() {
    this.userName = localStorage.getItem('user-name');

    if (!this.userName) {
      await this.alertService.promptAlert().then((name: any) => (this.userName = name.value));
      localStorage.setItem('user-name', this.userName);
       }
  }

  nextPage(){
    this.actualPage++;
    console.log(this.getId);
    this.storageSvc.Update('events', this.getId, {actualPage: this.actualPage});
    this.storageSvc.DeleteColecction('votes')
  }

  previousPage(){
    this.actualPage--;
    this.storageSvc.Update('events', this.getId, {actualPage: this.actualPage});
    this.storageSvc.DeleteColecction('votes')
  }

}


