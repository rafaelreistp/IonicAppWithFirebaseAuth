import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
  }

  loginUser(email:string, password:string):Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  signupUser(email:string, password:string): Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password).then( newUser => {
      firebase.database().ref(`/userProfile/${newUser.user.uid}/email`).set(email);
    }).catch( e => {
      console.error(e);
      throw new Error(e);
    })
  }

  resetPassword(email: string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void>{
    const userId: string = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    return firebase.auth().signOut();
  }

}
