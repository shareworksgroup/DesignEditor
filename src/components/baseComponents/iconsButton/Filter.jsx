import React from 'react'
import Swal from 'sweetalert2'
import Util from '../../utils/util'
import FilterManage from '../business/FilterManage'

class IconFilter extends React.Component {

  state = {
    show: false,
    showManage: false
  }

  groupNode = React.createRef()

  componentDidMount() {
    this.outClick = Util.outClick(this.groupNode.current, () => {
      this.closeSelection()
    })
  }

  componentWillUnmount() {
    this.outClick && this.outClick.cancel()
  }

  showSelection = () => {
    this.setState({ show: true })
  }

  closeSelection = () => {
    this.setState({ show: false })
  }

  toggleSave = () => {
    const { onSave } = this.props
    Swal({
      title: "New Filter",
      text: "Please input a name",
      showCloseButton: true,
      showCancelButton: true,
      input: 'text',
      inputValidator: (value) => {
        return !value && 'You need to write something!'
      }
    }).then((result) => {
      console.log('result', result)
      if (result && result.value) {
        onSave(result.value).then(res => {
          Swal(
            'SUCCESS!',
            res.data.message,
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal(
        //   'Cancelled',
        //   'Your filter is safe :)',
        //   'error'
        // )
      }
    })
  }

  filterSetting = () => {
    this.setState({showManage: true})
    return null
  }

  render() {
    const { data, filterOnClick, onDelete } = this.props
    const { showSaveAs, show, showManage } = this.state
    const cn = show ? 'dropdown-menu dropdown-menu-right show' : 'dropdown-menu dropdown-menu-right'
    return <div className="btn-group" ref={this.groupNode}>
      <div class="btn-group">
        <button onClick={this.showSelection} type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-filter"></i>
        </button>
        <ul class={cn}>
          <li class="dropdown-header">New Filter</li>
          <li class="dropdown-item" onClick={this.toggleSave}><a href="javascript:void(0);" id="newFilter">Save as</a></li>
          <li role="separator" class="divider"></li>
          <li class="dropdown-header">Filter <a onClick={this.filterSetting} class="filter-control" data-src="#filterModal" href="javascript:;"><i class="fa fa-gear"></i></a></li>
          {
            data.map(item => {
              return <a onClick={() => {
                filterOnClick(item)
                // this.closeSelection()
              }} key={item._id} className="dropdown-item" href>{item._name}</a>
            })
          }
        </ul>
      </div>
      <FilterManage visible={showManage} data={data}
       onClose={() => this.setState({showManage: false})}
       onDelete={onDelete} />
    </div>
  }
}

export default IconFilter