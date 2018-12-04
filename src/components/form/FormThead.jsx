import React from 'react'
import classnames from 'classnames'

class FormThead extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {sortedTheadData, changeSortState} = this.props
    return (
      <thead>
        <tr>
          {
            sortedTheadData.map((item, index) => {
              const cn = classnames({
                sorting: !item.sorted,
                'sorting-asc': item.sorted && item.asc,
                'sorting-desc': item.sorted && !item.asc
              })
              return <th className={cn} key={index} onClick={() => changeSortState(index)}>
                {item.title}
              </th>
            })
          }
        </tr>
      </thead>
    )
  }
}

export default FormThead