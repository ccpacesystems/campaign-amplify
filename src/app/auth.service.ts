import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }    

  logout() {
      localStorage.clear();  
      sessionStorage.clear();      
  }

  private getLocalStorageValue(keyName: string) {
      const keys = Object.keys(localStorage);
      for (let key of keys) {
          if (key.indexOf(keyName) > -1) {
              return localStorage.getItem(key);
          }
      }
      return null;
  }

  get idToken() {
      return this.getLocalStorageValue("idToken");
  }

  get isAuthenticated(): boolean {
      if (this.idToken == null) {
          return false
      }
      if (this.isTokenExpired) {
          return false;
      }
      return true
  }

  get isTokenExpired(): boolean {
      var nowEpoch = Date.now().valueOf() / 1000
      var token = jwt_decode(this.idToken)

      if (token["exp"] != null) {
          var tokenExp = token["exp"]
          //console.log('Exp: ' + tokenExp)
          if (nowEpoch > tokenExp) {
              return true
          }
          else {
              return false
          }
      }
      return true
  }

  get isAdmin() {
      if (this.isSuperUser){
          return true;
      }
      if (this.isAuthenticated) {
          var token = jwt_decode(this.idToken)
          if (token["cognito:groups"] == null) {
              return false
          }
          else {
              var groups = token["cognito:groups"]
              return groups.indexOf('Admins') > -1
          }
      }

      return false
  }

  get isSuperUser() {
      if (this.isAuthenticated) {
          var token = jwt_decode(this.idToken)
          if (token["cognito:groups"] == null) {
              return false
          }
          else {
              var groups = token["cognito:groups"]
              return groups.indexOf('SuperUsers') > -1
          }
      }

      return false
  }

  get userEmail() {
      if (this.isAuthenticated) {
          var token = jwt_decode(this.idToken)

          if (token["email"] == null) {
              return null
          }
          else {
              var email = token["email"]
              return email
          }
      }

      return null
  }

  get username() {
      var token = jwt_decode(this.idToken)

      if (token["cognito:username"] == null) {
          return null
      }
      else {
          var username = token["cognito:username"]
          return username
      }
  }

  get name() {
      var token = jwt_decode(this.idToken)

      if (token["name"] == null) {
          return null
      }
      else {
          var name = token["name"]
          return name
      }
  }

  get roles() {
      var token = jwt_decode(this.idToken)

      if (token["cognito:groups"] == null) {
          return null
      }
      else {
          var roles = token["cognito:groups"]
          return roles
      }
  }
}
