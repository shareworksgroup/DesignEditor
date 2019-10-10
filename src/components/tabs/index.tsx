import React from 'react';
import classnames from 'classnames';

class Tabs extends React.Component<ITabsProps, ITabsState> {

  state: ITabsState = {
    selectedIndex: 0
  }

  static Tab: typeof Tab;

  render() {
    const { children, onClick } = this.props;
    return <React.Fragment>
      <ul className="nav nav-tabs" onClick={onClick}>
        {React.Children.map(children, (value: any, index) => {
          return <li className="nav-item">
            <a
              onClick={() => { this.setState({ selectedIndex: index }); }}
              className={classnames("nav-link", this.state.selectedIndex === index && "active")}
            >
              <i className={`${value.props.icon} icon`} />{value.props.tab}
            </a>
          </li>;
        })}
      </ul>
      <div onClick={onClick}>
        {React.Children.toArray(children)[this.state.selectedIndex]}
      </div>
    </React.Fragment>;
  }
}

interface ITabsProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLUListElement, MouseEvent>) => void;
}

interface ITabsState {
  selectedIndex: number;
}

class Tab extends React.Component<ITabProps> {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

interface ITabProps {
  icon?: string;
  tab?: string;
}

Tabs.Tab = Tab;

export default Tabs;