import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EventSesion } from 'src/app/models/event.model';
import { VoteModel } from 'src/app/models/vote.model';
import { AlertService } from 'src/app/services/alerts.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/shared/primeng/form.validator';

@Component({
  selector: 'fc-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.scss']
})
export class ParticipantViewComponent extends FormValidator implements OnInit {
  loading: boolean = false;
  getId = this.router.url.split('/')[2].trim();
  event: EventSesion;
  override formGroup: any;
  userName: any = undefined;
  activeUsers: any[] = undefined;

  eventData: any;
  actualPage = 0;
  votes: VoteModel[];

  testEvent = [
    {
      id: 1,
      type: 'images',
      question: '¿Cuál crees que cumple con Single Responsability?',
      options: [
        {
          id: 1,
          url: 'https://www.researchgate.net/publication/335351970/figure/fig5/AS:795048484536323@1566565738552/Code-snippet-implementing-the-check-ifA-B0.jpg'
        },
        {
          id: 2,
          url: 'https://intelliabbdotcom.files.wordpress.com/2018/03/snippet_def.jpg'
        }
      ]
    },

    {
      id: 2,
      type: 'images',
      question: '¿Cuál crees que cumple con O?',
      options: [
        {
          id: 1,
          url: 'https://picsum.photos/200/300'
        },
        {
          id: 2,
          url: 'https://picsum.photos/200/300'
        }
      ]
    }
  ];

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
    });
  }

  changeName() {
    localStorage.removeItem('user-name');

    this.removeUser(this.getUser().id);
  }

  getUser() {
    console.log(this.activeUsers);
    return this.activeUsers.find((u) => u.name == this.userName);
  }

  removeUser(id: string) {
    this.storageSvc.Delete('activeUsers', id).then(() => {
      this.userName = undefined;
    });
  }

  definirMensajesError(): void {}

  getSesion() {
    this.loading = true;
    let aux = this.getId;
    this.storageSvc.GetByParameter('events', 'id', aux).subscribe((res: any) => {
      this.event = res[0];
      this.actualPage = res[0].actualPage;
      this.eventData = this.testEvent; //res[0].data;
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


