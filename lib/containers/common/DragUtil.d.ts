export declare const getSource: <T = IKeyValueMap<any>>(data?: {}, transform?: (T: any) => T) => {
    beginDrag(props: T): {};
    canDrag: (props: any) => boolean;
};
export declare const getCollect: () => (connect: any, monitor: any) => {
    connectDragSource: any;
    isDragging: any;
};
