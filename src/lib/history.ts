import History from 'immutable-undo';
import debounce from 'lodash/debounce';
import DesignState from '../store/DesignState';

class UndoRedeo {

  history: History;
  store: DesignState;

  constructor() {
    this.history = History.create({
      maxUndos: 2000
    });
    this.registerUndoRedo();
  }

  setStore(store) {
    this.store = store;
  }

  getStore() {
    return this.store;
  }

  registerUndoRedo = () => {
    document.addEventListener('keydown', this.undoRedo);
  }

  undoRedo = (e) => {
    if (!this.store) {
      return;
    }
    if (e.which === 89 && e.ctrlKey) {
      this.history.redo(this.store.getData());
      if (this.history.canRedo) {
        const data = this.history.next;
        this.history = this.history.redo(this.store.getData());
        this.store.setData(data);
      }
    }
    else if (e.which === 90 && e.ctrlKey) {
      if (this.history.canUndo) {
        const data = this.history.previous;
        this.history = this.history.undo(this.store.getData());
        this.store.setData(data);
      }
    }
  }

  recordHistory() {
    const data = this.store.getData();
    this.history = this.history.push(data);
  }

}

let undoRedo = new UndoRedeo();

export const record = (delay?: number) => (target: Object, key: string, descripter: any): any => {
  let recordHistory = null;
  if (delay) {
    recordHistory = debounce(undoRedo.recordHistory.bind(undoRedo), delay, { leading: true, trailing: false });
  } else {
    recordHistory = undoRedo.recordHistory.bind(undoRedo);
  }
  return {
    value: function (...args: any[]) {
      if (!undoRedo.getStore()) {
        undoRedo.setStore(this);
      }
      recordHistory();
      return descripter.value.apply(this, args);
    }
  };
}

