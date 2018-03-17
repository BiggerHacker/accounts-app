import * as React from 'react'
import PropTypes from 'prop-types'

import { IRecord } from './Records'

class Record extends React.Component<IRecord, {}> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
  }

  render () {
    const { date, title, amount } = this.props
    return (
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{amount}</td>
      </tr>
    )
  }
}

export default Record
