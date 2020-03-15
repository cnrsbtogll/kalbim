import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

// navigation service
import NavigationService from '../NavigationService';

class AuthStore {
  @observable mail = null;
  @observable image = null;
  @observable id = null;
  @observable name = 'Misafir!';
  @observable phone = null;

  
  @action async saveMail(mail) {
    try {
      await AsyncStorage.setItem('mail', mail);
      await this.setupAuth();
    } catch (e) {
      console.log(e);
    }
  }
  @action async saveID(id) {
    try {
      await AsyncStorage.setItem('id', id);
      await this.setupAuth();
    } catch (e) {
      console.log(e);
    }
  }
  @action async saveName(name) {
    if (!name) {
      name = 'Misafir';
    }
    try {
      await AsyncStorage.setItem('name', name);
      await this.setupAuth();
    } catch (e) {
		this.name = 'Error';
      console.log(e);
    }
  }
  @action async removeMail() {
    try {
      await AsyncStorage.removeItem('mail');
      this.mail = null;
      await this.setupAuth();
    } catch (e) {
      console.log(e);
    }
  }
  @action async removeID() {
    try {
      await AsyncStorage.removeItem('id');
      this.id = null;
      await this.setupAuth();
    } catch (e) {
      console.log(e);
    }
  }
  @action async removeName() {
    try {
      await AsyncStorage.removeItem('name');
      this.name = null;
      await this.setupAuth();
    } catch (e) {
      console.log(e);
    }
  }
  @action async removeID() {
    try {
      await AsyncStorage.removeItem('id');
      this.id = null;
      await this.setupAuth();
    } catch (e) {
      console.log(e);
    }
  }
  @action async setupAuth() {
    await this.getID();
  }  
//   @action async getMail() {
//     try {
//       const mail = await AsyncStorage.getItem('mail');
//       if (!mail) {
//         NavigationService.navigate('Auth');
//         return false;
//       }

//       this.mail = mail;
//       NavigationService.navigate('App');
//     } catch (e) {
//       console.log(e);
//     }
//   }

  @action async getID() {
    try {
      const id = await AsyncStorage.getItem('id');
      if (!id) {
        NavigationService.navigate('Auth');
        return false;
      }
      this.id = id;
      NavigationService.navigate('App');
    } catch (e) {
      console.log(e);
    }
  }
//   @action async getName() {
//     try {
// 		debugger
//       const name = await AsyncStorage.getItem('name');
//       if (!name) {
//         this.name = 'Misafir';
//       } else {
//         this.name = name;
//       }
//     } catch (e) {
//       this.name = 'Error';
//       console.log(e);
//     }
//     return name;
//   }
}

export default new AuthStore();
