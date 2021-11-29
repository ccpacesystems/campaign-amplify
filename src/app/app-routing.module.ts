import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './authguard.service';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
        path: '', component: AppComponent,
        children: [
            {path: '', component: CampaignsComponent},
           
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: '/notfound'},
])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
