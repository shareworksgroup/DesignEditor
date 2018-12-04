export const getSource = (data) => ({
  beginDrag(props) {
    console.log(props)
    return { ...data };
  },
  canDrag: (props) => true
});

export const getCollect = () =>  (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});