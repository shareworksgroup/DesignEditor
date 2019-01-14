

export interface IRootStore {
  DesignState: any,
}

export interface IStoreProps {
  rootStore: IRootStore
}

export interface IDndProps {
  connectDropTarget: Function,
  isOver: boolean,
  canDrop: boolean
}



