import React from 'react'
import classnames from 'classnames'
const mobxReact = require('mobx-react')

class RowRender extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {tableContent, theadData} = this.props
    return (
      <tbody>
        {
          tableContent.map((content, index) => {
            return <tr key={index}>
              {
                theadData.map((headData, headIndex) => {
                  return <td key={headIndex}>
                    {content[headData.field]}
                  </td>
                })
              }
            </tr>
          })
        }
      </tbody>
    )
  }
}

export default mobxReact.observer(RowRender)