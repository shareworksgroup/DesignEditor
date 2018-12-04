import React from 'react'
import classnames from 'classnames'

const PageLi = (props) => {
  const {text, actived = false, disabled = false, onClick} = props
  let cn = classnames({
    'page-item': true,
    'active': !disabled && actived,
    'disabled': disabled
  })
  const clicked = () => {
    if (!disabled && !actived) {
      onClick(text)
    }
  }
  return <li className={cn} onClick={clicked}><a className="page-link" href>{text}</a></li>     
}

class BootPagination extends React.Component {

  componentDidMount() {
  }

  pageItemOnClick = (text) => {
    const {total, pageSize, onChange, current} = this.props     
    const pageCounts = Math.ceil(total / pageSize)           
    switch (text) {
      case 'First':
        onChange(1, pageSize)
      break
      case 'Previous':
        onChange(current - 1, pageSize)
      break
      case 'Next':
        onChange(current + 1, pageSize)        
      break
      case 'Last':
        onChange(pageCounts, pageSize)      
      break
      case '...':    
      break
      default :
        onChange(parseInt(text), pageSize)              
      break
    }
  }

  getPageItems() {
    const {total, pageSize, current} = this.props  
    const pageCounts = Math.ceil(total / pageSize)      
    const pageItems = []
    if (pageCounts <= 2) {
      pageItems.push(<PageLi disabled={current===1} text="First" onClick={this.pageItemOnClick} />)
      pageItems.push(<PageLi disabled={current===1} text="Previous" onClick={this.pageItemOnClick} />)
      for (let i = 0; i < pageCounts; i++) {
        pageItems.push(<PageLi actived={current - 1 === i} text={i + 1} onClick={this.pageItemOnClick} />)
      }  
      pageItems.push(<PageLi text="Next" disabled={pageCounts === current}  onClick={this.pageItemOnClick} />)
      pageItems.push(<PageLi text="Last" disabled={pageCounts === current}  onClick={this.pageItemOnClick} />)
    } else {
      if (current - 1 === 0) {
        pageItems.push(<PageLi disabled text="First" onClick={this.pageItemOnClick} />)
        pageItems.push(<PageLi disabled text="Previous" onClick={this.pageItemOnClick} />)

        pageItems.push(<PageLi actived text="1" onClick={this.pageItemOnClick} />)
        pageItems.push(<PageLi text="2" onClick={this.pageItemOnClick} />)
        pageItems.push(<PageLi text="..." onClick={this.pageItemOnClick} />)  
        
        pageItems.push(<PageLi text="Next" onClick={this.pageItemOnClick} />)
        pageItems.push(<PageLi text="Last" onClick={this.pageItemOnClick} />)
        
      } else {
        pageItems.push(<PageLi text="First" onClick={this.pageItemOnClick} />)
        pageItems.push(<PageLi text="Previous" onClick={this.pageItemOnClick} />)

        pageItems.push(<PageLi text="..." onClick={this.pageItemOnClick} />)

        if (pageCounts === current) {
          pageItems.push(<PageLi text={current - 1} onClick={this.pageItemOnClick} />)             
          pageItems.push(<PageLi actived text={current} onClick={this.pageItemOnClick} />)
        } else {
          pageItems.push(<PageLi actived text={current} onClick={this.pageItemOnClick} />)             
          pageItems.push(<PageLi text={current + 1} onClick={this.pageItemOnClick} />)
        }

        if (current < pageCounts - 1) {
          pageItems.push(<PageLi text="..." onClick={this.pageItemOnClick} />)   
        }
        
        pageItems.push(<PageLi disabled={pageCounts === current} text="Next" onClick={this.pageItemOnClick} />)
        pageItems.push(<PageLi disabled={pageCounts === current} text="Last" onClick={this.pageItemOnClick} />)
      }
    }
    return pageItems
  }

  render() {
    const pageItems = this.getPageItems()
    return <ul className="paginate paging-full-numbers">
      {
        pageItems
      }
    </ul>
  }

}

export default BootPagination