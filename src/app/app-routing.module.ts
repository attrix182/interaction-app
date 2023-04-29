import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignSesionComponent } from './desing-sesion/design-sesion/design-sesion.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ParticipantViewComponent } from './pages/participant-view/participant-view.component';
import { CreateFormComponent } from './pages/home/components/create-form/create-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':id',  component: HomeComponent},
  {path:'event/create', component: CreateFormComponent},
  {path: 'about/landing',  component: LandingComponent},
  {path:'info/:id', component: HomeComponent},
  {path:'sesion/:id', component: ParticipantViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
