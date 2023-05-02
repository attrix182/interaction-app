import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/shared/primeng/form.validator';

@Component({
  selector: 'fc-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent extends FormValidator implements OnInit {
  override formGroup: UntypedFormGroup;
  isLoading: boolean = false;
  questions: any[] = [];
  teamName: string;
  @Output('back') back: any = new EventEmitter<void>();
  @Output('nextStep') nextStepEvent: any = new EventEmitter<string>();
  visible: boolean;
  options: any[] = [
    { name: 'Code snippet', code: '1' },
    { name: 'Imagenes', code: '1' },
    { name: 'Opciones', code: '1' },
    { name: 'Booleano', code: '1' }
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private storageSvc: StorageService,
    private cloudFireStore: AngularFirestore
  ) {
    super();
  }

  definirMensajesError(): void {}

  showDialog() {
    this.visible = true;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      question: ['', [Validators.required]],
      optionA: ['', [Validators.required]],
      optionB: ['', [Validators.required]]
    });
  }

  addQuestion(): void {
    let question = {
      id: this.questions.length + 1,
      question: this.formGroup.value.question,
      type: 'images',
      options: [
        { id: 1, url: this.formGroup.value.optionA },
        { id: 2, url: this.formGroup.value.optionB }
      ]
    };

    this.questions.push(question);
    this.formGroup.reset();
    this.visible = false;
  }

  createSesion() {
    this.isLoading = true;
    let form = {} as any;
    form.team = this.teamName;
    form.questions = this.questions;
    form.actualPage = 0;
    form.id = this.cloudFireStore.createId();
    form.active = true;
    this.storageSvc
      .InsertCustomID('events', form.id, form)
      .then((res) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: '¡Creada!', detail: 'Sesión creada con éxito' });
        this.formGroup.reset();
        this.nextStepEvent.emit(form.id);
      })
      .catch((err) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la sesión' });
      });
  }
}
