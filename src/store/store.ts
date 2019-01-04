
import { configure } from 'mobx';
import stateInjector from './stateInjector';
configure({ enforceActions: 'always' });

class RootStore {
  axiosInstance: any;
  constructor() {
    stateInjector(this);
  }
}

export default new RootStore();
