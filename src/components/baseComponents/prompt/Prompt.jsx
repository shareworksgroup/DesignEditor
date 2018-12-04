import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

class Prompt extends React.Component {

  node = React.createRef()

  componentDidMount() {
    this.show()
  }

  show = () => {
    const { animateType = 'slow', animateConfig = { 'right': 820 }, duration = 3000 } = this.props.conf
    $(this.node.current).animate(animateConfig, animateType)
    if (duration !== -1) {
      setTimeout(() => {
        this.close()
      }, duration)
    }
  }

  close = () => {
    $(this.node.current).fadeOut('slow')
    this.props.onClose(this.props.conf._id)
  }

  render() {
    const { type = 'success', title = 'Success', message = '', width = 350 } = this.props.conf
    const cn = `prompt prompt-${type}`
    return <div class={cn} name="slidePrompt" ref={this.node}>
      <div class="prompt-icon">
        <i></i>
      </div>
      <div class="prompt-content" style={{ width: width }}>
        <p class="prompt-type">{title}</p>
        <p class="prompt-message">{message}</p>
      </div>
      <div class="prompt-close" onClick={this.close}>
        <i class="mdi-navigation-close"></i>
      </div>
    </div>
  }
}


class PromptManager extends React.Component {

  state = {
    configArray: []
  }

  ref = React.createRef()

  componentDidMount() {
    if (!window.promptManager) {
      window.promptManager = {
        instance: this,
        show: (config) => {
          this.setState((preState, props) => {
            preState.configArray.push({ ...config, _id: Math.random() })
            return {
              configArray: preState.configArray
            }
          })
        }
      }
    }
  }

  closePrompt = (_id) => {
    this.setState((preState, props) => {
      return {
        configArray: preState.configArray.filter(conf => conf._id !== _id)
      }
    })
  }

  render() {
    const { configArray } = this.state
    if (window.promptManager && window.promptManager.instance !== this) {
      return null
    }
    return ReactDOM.createPortal(
      <div name="prompt-manager">
        {
          configArray.map(conf => {
            return <Prompt key={conf._id} conf={conf} onClose={this.closePrompt} />
          })
        }
      </div>,
      document.body)
  }
}

export default PromptManager