
import { configure } from 'mobx';
import stateInjector from './stateInjector';
configure({ enforceActions: 'observed' });

class RootStore {
  axiosInstance: any;
  constructor() {
    stateInjector(this);
  }
}

export default new RootStore();
