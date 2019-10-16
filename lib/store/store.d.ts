import { IRootStore } from '../schemas/common';
import DesignState from './DesignState';
declare class RootStore implements IRootStore {
    DesignState: DesignState;
    constructor();
}
declare const _default: RootStore;
export default _default;
