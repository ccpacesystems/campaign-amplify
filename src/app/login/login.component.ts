import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'ABA Web App';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields: FormFieldTypes;

  constructor(private ref: ChangeDetectorRef, private router: Router) {
    this.formFields = [
      {
        type: "name",
        label: "Name",
        placeholder: "Custom email placeholder",
        inputProps: { required: true, autocomplete: "name" },
      },
      {
        type: "email",
        label: "Custom Email Label",
        placeholder: "Custom email placeholder",
        inputProps: { required: true, autocomplete: "username" },
      },
      {
        type: "password",
        label: "Custom Password Label",
        placeholder: "Custom password placeholder",
        inputProps: { required: true, autocomplete: "new-password" },
      }
    ];

  }

  ngOnInit() {
    
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      console.log(this.user);
      console.log(this.authState);
      this.ref.detectChanges();      

      if (this.authState === AuthState.SignedIn){        
        console.log("User Signed In, route to default")        
        window.location.assign('/')
      }
    })        
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

}
