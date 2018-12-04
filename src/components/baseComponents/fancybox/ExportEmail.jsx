
import React from 'react'
import ReactDOM from 'react-dom'

class ExportEmail extends React.Component {

  render() {
    const {id = 'escalateModal', confirm, submitting} = this.props
    const btntext = submitting ? 'SUBMITTING...' : 'SUBMIT'
    return ReactDOM.createPortal(
      <div class="w-50" id={id} style={{display: 'none'}}>
        <div class="widget-container">
          <div class="heading">
            <i class="mdi-action-payment">
            </i>You are exporting too many data which will take too much time to process, we will send the document to your email after we finish your request.
            </div>
          <div class="widget-content">
            <form>
              <div class="form-group">
                <label for="email-input">Email *</label>
                <div id="statusSwitch">
                  <input id="email-input" name="email" type="text" class="form-control input-sm" data-rule-required="true" data-rule-email="true"
                    data-val="true" data-bind="value:myEmail" aria-required="true" />
                </div>
              </div>
              <div class="modal-btn">
                <input onClick={() => $.fancybox.close()} type="button" class="btn btn-default-outline btn-modal" value="CANCEL" />
                <input onClick={confirm} type="button" class="btn btn-primary-outline btn-modal" value={btntext} />
              </div>
            </form>
          </div>
        </div>
      </div>,
      document.body
    )
  }
}

export default ExportEmail

