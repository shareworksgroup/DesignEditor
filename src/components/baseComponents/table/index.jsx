import React from 'react'
import classnames from 'classnames'

const HeadRender = (props) => {
  return <thead>
    <tr>
      {
        props.data.map(item => {
          console.log(item)
          const cn = classnames({
            'sorting': item._sortState === 'ascending',
            'sorting-desc': item._sortState === 'descend'
          })
          console.log(cn)
          return <th class={cn} key={item._field}>{item._name}</th>
        })
      }
    </tr>
  </thead>
}

const RowRender = (props) => {
  const {data, headData} = props  
  return <tbody>
    {
      data.map((content, index) => {
        return <tr key={index}>
          {
            headData.map((headData, headIndex) => {
              return <td key={headIndex}>
                {content[headData._field]}
              </td>
            })
          }
        </tr>
      })
    }
  </tbody>
}

class BootTable extends React.Component {

  componentDidMount() {
    this.resizeFullHouse()
    $(window).resize(function () {
      this.resizeFullHouse()
    }.bind(this))
  }

  tableNode = React.createRef()
  responsiveNode = React.createRef()

  resizeFullHouse() {
    console.log('resizeFullHouse')
    var winHeight = $(window).height()
    var navHeight = $(".wrapper > .navbar").height() + $(".wrapper > .fixed-sidebar-left").height()
    if (screen.width < 1025) {
      var navHeight = $(".wrapper > .navbar").height()
    }
    var searchHeight = $("#searchHeight").height()
    $(this.responsiveNode.current).css({
      maxHeight: winHeight - navHeight - searchHeight - 170
    })
    $(this.tableNode.current).floatThead({
      scrollContainer: true
    })
  }

  render() {
    const {headData, contentData} = this.props
    return <div class="table-responsive" ref={this.responsiveNode} style={{maxHeight: '190px'}}>
      { 
        contentData.length ? <table ref={this.tableNode} class="table table-bordered table-striped table-hover table-sm">
          <HeadRender data={headData} />
          <RowRender data={contentData} headData={headData} />
        </table> : <div></div>
      }
    </div>
  }

}

export default BootTable