import React from 'react'

class Loading extends React.Component {

  render() {
    const {show} = this.props
    const cn = show ? 'spinner-content' : 'spinner-content d-none'
    return <div class={cn} id="spinnerDemo">
      <div class="loader"></div>
    </div>
  }
  
}

export default Loading