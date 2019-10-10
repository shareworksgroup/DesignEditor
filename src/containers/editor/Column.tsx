import React from 'react';
import PlaceHolder from '../common/PlaceHolder';
import { inject, observer } from 'mobx-react';
import { ErrorBoundary } from '../../components';
import rootStore from '../../store/store';
import { DragType, OperationMode } from '../../lib/enum';
import { DropTarget, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import Content from './Content';
import { IColumn } from 'src/schemas/transform';

const target = {
  drop(props: IColumnProps, monitor: DropTargetMonitor) {
    const item = monitor.getItem();
    if (item.mode === OperationMode.INSERT) {
      rootStore.DesignState.execCommand('addContent', item, props.column.values._meta);
    } else {
      rootStore.DesignState.execCommand('moveContent', item, null, props.guid);
    }
  },
  canDrop(props, monitor: DropTargetMonitor) {
    return monitor.isOver({ shallow: true });
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

@(DropTarget as any)([DragType.CONTENT], target, collect)
@inject('rootStore')
@observer
class Column extends React.Component<IColumnProps> {

  onUpdate = (guid, key, value) => {
    const { rootStore: { DesignState } } = this.props;
    DesignState.updateAttribute(guid, key, value);
  }

  render() {
    const { connectDropTarget, isOver, column, canDrop, guid, size, rootStore: { DesignState } } = this.props;
    const style = column.contents.length === 0 ? { position: 'absolute', top: 0, left: 0, width: '100%' } : {};
    return connectDropTarget(<div className={`col-${size} u_column`} >
      {column.contents.length === 0 && <div className="ds-placeholder-empty">
        <span>No content here. Drag content from right.</span>
      </div>}
      {
        column.contents.map(i => {
          const Extension = DesignState.getExtension(i.values._meta.subtype);
          if (!Extension) {
            console.warn(`can not parse type: ${i.values._meta.subtype}`);
            return <div key={i.values._meta.guid}>parse {i.values._meta.subtype} failed</div>;
          }
          return <Content key={i.values._meta.guid} columnGuid={guid} guid={i.values._meta.guid} type={Extension.type} {...i.values}>
            <ErrorBoundary>
              <Extension
                {...i.values}
                focus={DesignState.selected === i.values._meta.guid}
                onUpdate={(key, value) => this.onUpdate(i.values._meta.guid, key, value)}
              />
            </ErrorBoundary>
          </Content>;
        })
      }
      {isOver && canDrop && <PlaceHolder style={style} />}
    </div>);
  }
}

interface IColumnProps {
  column?: IColumn;
  guid?: string;
  rootStore?: any;
  size?: number | string;
  connectDropTarget?: ConnectDropTarget;
  isOver?: boolean;
  canDrop?: boolean;
}

export default Column;