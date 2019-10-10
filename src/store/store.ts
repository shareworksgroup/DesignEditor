
import { configure } from 'mobx';
import { IRootStore } from '../schemas/common';
import DesignState from './DesignState';

configure({ enforceActions: 'observed' });

class RootStore implements IRootStore {

  DesignState: DesignState;

  constructor() {
    this.DesignState = new DesignState({ rootStore: this });
  }
}

export default new RootStore();
