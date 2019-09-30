export const getSource = <T = IKeyValueMap>(data = {}, transform?: (T) => T ) => ({
  beginDrag(props: T) {
    const item = transform ? transform(props) : {};
    return { ...data, ...item };
  },
  canDrag: (props) => true
});

export const getCollect = () => (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});