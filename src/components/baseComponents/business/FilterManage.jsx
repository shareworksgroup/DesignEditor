import React from 'react'
import Dialog from 'rc-dialog'
import NoData from '../../noData/index'

class FilterManage extends React.Component {

  state = {
    destroyOnClose: false,
    mousePosition: {},
    // localData: [],
    // showLocalData: false
  }

  onClick = e => {
    this.setState({
      mousePosition: {
        x: e.pageX,
        y: e.pageY,
      },
      visible: true,
    })
  }

  constructor(props) {
    super(props)
  }

  close = () => {
    // this.setState({showLocalData: false})
    // this.deleteIds.length = 0
    this.props.onClose()
  }

  // showLocal = () => {
  //   this.setState({showLocalData: true, localData: _.cloneDeep(this.props.data)})
  // }

  // localChange(item, value) {
  //   console.log(item, value)
  //   item._name = value
  //   this.setState((prevState, props) => {
  //     return {
  //       localData: prevState.localData
  //     }
  //   })
  // }

  // deleteIds = []

  deleteItem = (item) => {
    // console.log(this.state.showLocalData)
    // if (!this.state.showLocalData) {
    //   let localData = _.cloneDeep(this.props.data).filter(item => item._id !== item._id)
    //   this.setState({showLocalData: true, localData})
    // } else {
    //   let localData = this.state.localData.filter(item => item._id !== item._id)
    //   this.setState({localData})      
    // }
    // this.deleteIds.push(item._id)
    this.props.onDelete(item._id)
  }

  // saveResult = () => {
  //   console.log('save!')
  //   this.deleteIds.forEach(id => {
  //     this.props.onDelete(id)
  //   })
  //   // if (this.state.showLocalData) {

  //   // }
  //   // this.props.onSave(item)
  // }

  render() {
    const {visible, data, onClose} = this.props
    const {localData, showLocalData} = this.state
    return <Dialog
      visible={visible}
      // wrapClassName={wrapClassName}
      animation="zoom"
      maskAnimation="fade"
      onClose={this.close}
      mousePosition={this.state.mousePosition}
      destroyOnClose={this.state.destroyOnClose}
      className="w-50"
      wrapClassName="flex-all-center"
    >
      <div class="widget-container">
        <div class="heading">
          <i class="mdi-action-settings"></i>My Filter Management
        </div>
        <div class="widget-content">
          {
            data.length !== 0 ? <table class="table table-striped table-condensed table-hover">
              <thead>
                <tr>
                  <th>Filter Name</th>
                  <th>Delete?</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map(item => {
                    return <tr key={item._id}>
                      <td>
                        <input disabled type="text" class="form-control input-sm" value={item._name} />
                      </td>
                      <td><a onClick={() => this.deleteItem(item)} href="javascript:void(0);" class="text-danger"><i class="mdi-content-clear"></i></a></td>
                    </tr>
                  })
                  // !showLocalData ? data.map(item => {
                  //   return <tr key={item._id}>
                  //     <td>
                  //       <input disabled onFocus={this.showLocal} type="text" class="form-control input-sm" value={item._name} />
                  //     </td>
                  //     <td><a onClick={() => this.deleteItem(item)} href="javascript:void(0);" class="text-danger"><i class="mdi-content-clear"></i></a></td>
                  //   </tr>
                  // }) : localData.map(item => {
                  //   return <tr key={item._id}>
                  //     <td>
                  //       <input type="text" class="form-control input-sm" value={item._name} onChange={(e) => this.localChange(item, e.target.value)} />
                  //     </td>
                  //     <td><a onClick={() => this.deleteItem(item)} href="javascript:void(0);" class="text-danger"><i class="mdi-content-clear"></i></a></td>
                  //   </tr>
                  // })
                }
              </tbody>
            </table> : <NoData height="325px" />
          }
          {/* <div class="modal-btn">
            <input type="button" class="btn btn-outline-default btn-modal" value="CANCEL" onClick={this.close} />
            <input type="button" class="btn btn-outline-primary btn-modal" value="SAVE" onClick={this.saveResult} />
          </div> */}
        </div>
      </div>
    </Dialog>
  }

}

export default FilterManage