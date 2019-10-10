import { configure } from 'mobx';
import DesignState from './DesignState';
configure({ enforceActions: 'observed' });
var RootStore = /** @class */ (function () {
    function RootStore() {
        this.DesignState = new DesignState({ rootStore: this });
    }
    return RootStore;
}());
export default new RootStore();
//# sourceMappingURL=store.js.map