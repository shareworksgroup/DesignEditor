
import { configure } from 'mobx';
import stateInjector from './stateInjector';
configure({ strict: 'always' });

class RootStore {
  axiosInstance: any;
  constructor() {
    stateInjector(this);
  }
}

export default new RootStore();
