import { user } from './userStore';
import { AsyncTrunk, ignore } from 'mobx-sync';
import { observable, action } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

export class RootStore {
  @ignore storeLoaded = false;

  @observable
  user = user;

  @action init = () => {
    return new Promise((resolve, reject) => {
      trunk.init().then(() => {
        store.storeLoaded = true;

        if (user.user) {
          resolve();
        } else {
          reject();
        }
      });
    });
  };
}

export const store = new RootStore();

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: '__NearMe__',
  delay: 1,
});
