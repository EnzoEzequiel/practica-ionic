

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './register.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RegisterPage }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RegisterPage
  ]
})
export class RegisterPageModule {}
