import React from 'react';
import classnames from 'classnames';

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortField: '',
      sortOrder: ''
    };
  }

  headerClick = (item) => {
    if (!item.sorter) {
      return;
    }
    const { onChange = Moon.fn } = this.props;
    const sorter = {
      sortField: item.dataIndex,
      sortOrder: this.state.sortOrder === '' ? 'asc' : this.state.sortOrder === 'asc' ? 'desc' : 'asc',
    }
    this.setState(sorter);
    onChange(sorter)
  }

  render() {
    const { dataSource = [], columns = [], className } = this.props;
    return <div class="table-responsive-vertical">
      <table class={classnames("table table-striped table-condensed table-hover", className)}>
        <thead>
          <tr>
            {
              columns.map(item => <th
                width={item.width}
                className={classnames({
                  sorting: item.sorter && !(this.state.sortField === item.dataIndex && this.state.sortOrder !== ''),
                  'sorting-desc': this.state.sortField === item.dataIndex && this.state.sortOrder === 'desc',
                  'sorting-asc': this.state.sortField === item.dataIndex && this.state.sortOrder === 'asc',
                })}
                onClick={() => { this.headerClick(item); }}
              >
                {item.title}
              </th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            dataSource.map(item => <tr>
            {
              columns.map(col => <td>{col.render ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}</td>)
            }
          </tr>)
          }
        </tbody>
      </table>
    </div>
  }
}

export default Table;