import React from 'react';
import { Input, Button } from '../../../../components';
import { guid, reOrder } from '../../../../lib/util';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? '#EEF3FB' : '#fff',
  ...draggableStyle,
});

class SocialItem extends React.Component<ISocialItemProps, ISocialItemState> {

  state: ISocialItemState = {
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

  deleteItem = guid => {
    const { items, onUpdate = () => { } } = this.props;
    const newItems = items.filter(item => item.guid !== guid);
    onUpdate('items', newItems);
  }

  onDragEnd = result => {
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items, onUpdate = () => { } } = this.props;
    if (typeof newIndex === 'undefined') {
      return;
    }
    const newItems = reOrder(
      items,
      oldIndex,
      newIndex
    );
    onUpdate('items', newItems);
  };

  render() {
    const { items } = this.props;
    return (<div className="ds-widget ds-link-widget social-panel">
      <div className="card-row">
        <div className="ds-widget-label col-6">
          <label className="ds-label-primary"><span>Icons</span></label>
        </div>
      </div>
      <div className="card-row" style={{ marginTop: 10 }}>
        <div className="col-12 social-add-panel" >
          <Input addOn="ICON" onChange={e => { this.setState({ icon: e.target.value }); }} value={this.state.icon} />
          <Input addOn="LINK" onChange={e => { this.setState({ url: e.target.value }); }} value={this.state.url} />
          <div className="social-button-wrap"><Button className="social-button" onClick={this.addItem} >Add</Button></div>
        </div>
      </div>
      <div className="card-row" style={{ marginTop: 10 }}>
        <SortContainer onSortEnd={this.onSortEnd} useDragHandle>
          {items.map((value, index) => (
            <SortItem
              value={value}
              key={value.guid}
              index={index}
              onModifyItem={(icon: string, url: string) => this.modifyItem(value.guid, icon, url)}
              onDeleteItem={() => this.deleteItem(value.guid)}
            />
          ))}
        </SortContainer>
      </div>
    </div>);
  }
}

const SortContainer = SortableContainer(({ children }) => <div className="col-12">{children}</div>);
const SortItem = SortableElement((props: ISortItemProps) => {
  const { value, onModifyItem, onDeleteItem } = props;
  return <div key={value.guid}>
    <div className="social-item-card" >
      <div>
        <DragHandle />
        <img style={{ width: 24 }} src={value.icon} />
        <a href="javascript:void(0)" className="social-delete-button" onClick={() => { onDeleteItem(); }} ><i className="icon icon-trash" /></a>
      </div>
      <div className="col-12" style={{ fontFamily: 'Courier New' }}>
        <Input addOn="ICON" onChange={e => { onModifyItem(e.target.value, value.url); }} value={value.icon} />
        <div style={{ height: 5 }} />
        <Input addOn="LINK" onChange={e => { onModifyItem(value.icon, e.target.value); }} value={value.url} />
      </div>
    </div>
  </div>;
});
const DragHandle = SortableHandle(() => <i className="drag-handler icon icon-drag-handler"/>);

interface ISortItemProps {
  value: ISocialItem;
  onModifyItem: (icon: string, url: string) => void;
  onDeleteItem: () => void;
}
interface ISocialItemProps {
  items?: ISocialItem[];
  onUpdate?: onUpdate;
}

interface ISocialItemState {
  icon: string;
  url: string;
}

export default SocialItem;