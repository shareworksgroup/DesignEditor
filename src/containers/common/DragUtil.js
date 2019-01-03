export const getSource = (data = {}, transfer) => ({
  beginDrag(props, monitor, compoenent) {
    const item = transfer ? transfer(props) : {};
    return { ...data, ...item };
  },
  canDrag: (props) => true
});

export const getCollect = () =>  (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});