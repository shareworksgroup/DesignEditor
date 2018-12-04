import DesignState from './DesignState';

function injector(rootStore) {
  rootStore['DesignState'] = new DesignState({rootStore});
}

export default injector;