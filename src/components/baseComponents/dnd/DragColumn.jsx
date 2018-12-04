import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  // width: 250
})

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
})

const DragColumn = (props) => {
  const {droppableId, items} = props
  return <Droppable droppableId={droppableId}>
    {(provided, snapshot) => (
      <div
        // className="col-md-6 col-lg-4 col-xl-3"
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}>
        {items.map((item, index) => (
          <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}>
                {item.component}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
}

export default DragColumn