import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { AuthService } from './auth.service';
import {AppRoutingModule} from './app-routing.module';
import { CampaignsComponent } from './campaigns/campaigns.component';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CampaignsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        ToastModule,
        ButtonModule,
        AmplifyUIAngularModule,
        AppRoutingModule
    ],
    providers: [ConfirmationService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
