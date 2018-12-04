import React from 'react';
import classnames from 'classnames';
import Moon from 'moon';

class Masonry extends React.Component {
  constructor(props) {
    super(props);
    this.initLayout = this.initLayout.bind(this);
    this.layout = this.layout.bind(this);
  }

  
  componentDidMount(){
    if(React.Children.count(this.props.children) !== 0 ){
      this.initLayout();
    }
    Moon.PubSub.subscribe('masonry_layout', this.layout);
  }

  
  componentDidUpdate(){
    if(this.$layout) {
      this.$layout.masonry('reloadItems');
      this.$layout.masonry('layout');
    } else {
      this.initLayout();
    }
  }

  componentWillUnmount(){
    this.$layout && this.$layout.masonry('destroy');
    Moon.PubSub.unsubscribe('masonry_layout', this.layout);
  }

  layout() {
    if (this.$layout) {
      this.$layout.masonry('layout');
    }
  }

  initLayout(){
    if (this.dom && $ && $.fn.masonry) {
      this.$layout = $(this.dom).masonry({
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-item',
        transitionDuration: '0s',
        initLayout: true
      });
    } else {
      throw new Error('Masonry need jQuery and jquery.masonry');
    }

  }

  render(){
    const { children, className } = this.props;
    return <div ref={(dom) => {this.dom = dom;}} className={classnames("masonry-container", className)}>
      {children}
    </div>
  }
}

export default Masonry;