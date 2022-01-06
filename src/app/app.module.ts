import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';

import { RegisterService } from './services/register/register.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RecriutmentComponent } from './recriutment/recriutment.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalComponent } from './personal/personal.component';
import { EducationComponent } from './education/education.component';
import { RecruiterProfileComponent } from './recruiter-profile/recruiter-profile.component';
import { HomeComponent } from './home/home.component';
import { TechnicalComponent } from './technical/technical.component';
import { TestComponent } from './test/test.component';
import { TimerComponent } from './timer/timer.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { FooterComponent } from './footer/footer.component';
import { UniversitiesComponent } from './universities/universities.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component'
// import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    RecriutmentComponent,
    ProfileComponent,
    PersonalComponent,
    EducationComponent,
    RecruiterProfileComponent,
    HomeComponent,
    TechnicalComponent,
    TestComponent,
    TimerComponent,
    AddQuestionComponent,
    FooterComponent,
    UniversitiesComponent,
    AdminProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    // MaterialModule

  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
