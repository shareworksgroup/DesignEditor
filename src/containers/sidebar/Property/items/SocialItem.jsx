import React from 'react';
import { Input, Button } from '../../../../components';
import { guid, reOrder } from '../../../../lib/util';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? '#EEF3FB' : '#fff',
  ...draggableStyle,
});

class SocialItem extends React.Component {

  state = {
    icon: '',
    url: '',
  }

  addItem = () => {
    const { items, onUpdate = () => { } } = this.props;
    if (this.state.icon.trim() === '' || this.state.url.trim() === '') {
      return;
    }
    onUpdate('items', [...items, { icon: this.state.icon, url: this.state.url, guid: guid() }]);
    this.setState({ icon: '', url: '' });
  }

  modifyItem = (guid, icon, url) => {
    const { items, onUpdate = () => { } } = this.props;
    items.some(item => {
      if (item.guid === guid) {
        item.icon = icon;
        item.url = url;
        return true;
      }
      return false;
    });
    onUpdate('items', items);
  }

  deleteItem = (guid) => {
    const { items, onUpdate = () => { } } = this.props;
    const newItems = items.filter(item => item.guid !== guid);
    onUpdate('items', newItems);
  }

  onDragEnd = (result) => {
    const { items, onUpdate = () => { } } = this.props;
    if (!result.destination) {
      return;
    }
    const newItems = reOrder(
      items,
      result.source.index,
      result.destination.index
    );
    onUpdate('items', newItems);
  }

  render() {
    const { items, onUpdate = () => { } } = this.props;
    return (<div className="ds-widget ds-link-widget social-panel">
      <div className="row">
        <div className="ds-widget-label col-6">
          <label className="ds-label-primary"><span>Icons</span></label>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-12 social-add-panel" >
          <Input addOn="ICON" onChange={(e) => { this.setState({ icon: e.target.value }); }} value={this.state.icon} />
          <Input addOn="LINK" onChange={(e) => { this.setState({ url: e.target.value }); }} value={this.state.url} />
          <div className="social-button-wrap"><Button className="social-button" onClick={this.addItem} >Add</Button></div>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div className="col-12"
                ref={provided.innerRef}
              >
                {
                  items.map((item, index) => (
                    <Draggable key={item.guid} draggableId={item.guid} index={index}>

                      {(provided, snapshot) => (
                        <div className="social-item-card" key={item.guid} ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div>
                            <i className="drag-handler icon icon-drag-handler"
                              {...provided.dragHandleProps}
                            />
                            <img style={{ width: 24 }} src={item.icon} />
                            <a href="javascript:void(0)" className="social-delete-button" onClick={() => { this.deleteItem(item.guid); }} ><i className="icon icon-trash" /></a>
                          </div>
                          <div className="col-12" style={{ fontFamily: 'Courier New' }}>
                            <Input addOn="ICON" onChange={(e) => { this.modifyItem(item.guid, e.target.value, item.url); }} value={item.icon} />
                            <div style={{ height: 5 }} />
                            <Input addOn="LINK" onChange={(e) => { this.modifyItem(item.guid, item.icon, e.target.value); }} value={item.url} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                }
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>);
  }
}

export default SocialItem;