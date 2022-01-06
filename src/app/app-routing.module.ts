import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component'
import { NavbarComponent } from './navbar/navbar.component'
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RecriutmentComponent } from './recriutment/recriutment.component';
import { PersonalComponent } from './personal/personal.component'
import { RecruiterProfileComponent } from './recruiter-profile/recruiter-profile.component';
import { EducationComponent } from './education/education.component';
import { HomeComponent } from './home/home.component';
import { TechnicalComponent } from './technical/technical.component';
import { TestComponent } from './test/test.component';
import { AddQuestionComponent } from './add-question/add-question.component'
import { UniversitiesComponent } from './universities/universities.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  // {path:'', component:NavbarComponent}
  { path: 'login', component: LoginComponent },
  { path: 'universities', component: UniversitiesComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'personal', component: PersonalComponent },
      { path: 'educational', component: EducationComponent },
      { path: 'technical', component: TechnicalComponent }
    ]
  },
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'recruitment', component: RecriutmentComponent },
  { path: 'recruiter-prof', component: RecruiterProfileComponent },
  { path:'admin-profile', component: AdminProfileComponent},
  { path: 'test', component: TestComponent },
  { path: 'technical', component: TechnicalComponent },
  { path: 'educational', component: EducationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
