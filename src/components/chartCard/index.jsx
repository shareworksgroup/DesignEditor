import React from 'react';
import classnames from 'classnames';
import Util from '../utils/util';

class ChartCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fullScreen: false,
			delete: false,
			showMenu: false,
		};
		this.onFullScreen = this.onFullScreen.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.menu = React.createRef();
		this.container = null;
		this.size = { height: 0, width: 0 };
	}
	
	componentDidMount(){
		const { onSizeChange = () => {} } = this.props;
		this.outClick = Util.outClick(this.menu.current, () => { 
      this.setState({showMenu: false});
		});
		if (this.container) {
			const rect = this.container.getBoundingClientRect();
			this.size = { height: rect.height-30, width: rect.width-30 };
			onSizeChange(this.size);
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}
	
	componentWillUnmount(){
		this.outClick && this.outClick.cancel();
	}

	componentDidUpdate(){
		const { onSizeChange = () => {} } = this.props;
		if (this.container) {
			const rect = this.container.getBoundingClientRect();
			const newSize = { height: rect.height -30, width: rect.width-30 };
			if (this.size.height !== newSize.height || this.size.width !== newSize.width) {
				this.size = newSize;
				onSizeChange(newSize);
			}
		}
	}

	onFullScreen() {
		this.setState({ 
			fullScreen: !this.state.fullScreen,
			showMenu: false,
		});
		(this.props.onFullScreen) && this.props.onFullScreen(!this.state.fullScreen);
	}

	onDelete() {
		const { onDelete } = this.props;
		this.setState({
			delete: true,
		})
		onDelete && onDelete();
	}

	render() {
		const fn = () => { };
		const { children, propChildren, title, iconClass = "mdi-image-timelapse",
						onRefresh = fn, onClick = fn, onSetDragNode = fn, needHead = true,
						className, style, extraMenu = [], contentClass, showDelete = false } = this.props;
		return (
			<div style={style} className={classnames("widget-container", this.state.fullScreen && 'db-expand', this.state.delete && 'animated fadeOut', className)}>
				{ needHead && <div className="heading" ref={(dom) => { onSetDragNode(dom) }}>
					<i className={iconClass}/><span className="heading-title">{title}</span>
					<div className="heading-control">
						<ul className="nav navbar-nav">
							{this.state.fullScreen && <li>
								<a href="javascript:void(0)" onClick={this.onFullScreen}><i className="fa fa-compress" name="smallScreen"></i></a>
							</li>}
							<li className="dropdown" ref={this.menu}>
								<a className="dropdown-toggle" href="javascript:void(0)" onClick={() => {this.setState({showMenu: true})}} >
									<span aria-hidden="true" className="fa fa-ellipsis-v"></span>
								</a>
								{
									this.state.showMenu && 
									<div className={classnames("dropdown-menu dropdown-menu-right p-a d-block")} onClick={()=>{this.setState({showMenu: false})}}>
									{!this.state.fullScreen && <a href="javascript:void(0)" className="dropdown-item" name="fullScreen" id="fullScreen" onClick={this.onFullScreen}>Fullscreen</a>}
									<a href="javascript:void(0)" className="dropdown-item" onClick={onRefresh}>Refresh</a>
									{
										extraMenu
									}
								 	{(!this.state.fullScreen && showDelete) && <div className="dropdown-divider"></div>}
									{(!this.state.fullScreen && showDelete) && <a href="javascript:void(0)" className="dropdown-item text-danger" id="deleteBtn" onClick={this.onDelete}>Delete</a>}
								</div>
								}
							</li>
						</ul>
					</div>
				</div> }
				<div className={classnames("widget-content", contentClass)} onClick={onClick} ref={(dom) => { this.container = dom; }}>
					{children || propChildren}
				</div>
			</div>);
	}
}

export default ChartCard;