import History from 'immutable-undo';
import debounce from 'lodash/debounce';
import DesignState from '../store/DesignState';
import { Config } from './util';

class UndoRedo {

  history: History;
  store: DesignState;

  constructor() {
    this.history = History.create({
      maxUndos: 5000
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

  redo = () => {
    this.history.redo(this.store.getData());
    if (this.history.canRedo) {
      const data = this.history.next;
      this.history = this.history.redo(this.store.getData());
      this.store.setData(data);
    }
  }

  undo = () => {
    if (this.history.canUndo) {
      const data = this.history.previous;
      this.history = this.history.undo(this.store.getData());
      this.store.setData(data);
    }
  }

  undoRedo = (e: KeyboardEvent) => {
    if (!this.store || !Config.enableUndoRedo) {
      return;
    }
    if (e.keyCode === 89 && e.ctrlKey) {
      this.redo();
    } else if (e.keyCode === 90 && e.ctrlKey) {
      this.undo();
    }
  }

  recordHistory() {
    const data = this.store.getData();
    this.history = this.history.push(data);
  }
}

const undoRedo = new UndoRedo();

interface RecordResult {
  value: Function
}

export const record = (delay?: number): Function => (target: Object, key: string, descripter: any): RecordResult => {
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
};

export const UndoRedoApi = {
  undo: undoRedo.undo,
  redo: undoRedo.redo
};